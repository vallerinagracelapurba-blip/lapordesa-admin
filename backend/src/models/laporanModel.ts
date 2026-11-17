
import db from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export type StatusLaporanDB =
  | "Menunggu"
  | "Diproses"
  | "Selesai"
  | "Ditolak";

export interface Laporan extends RowDataPacket {
  id: number;
  warga_id: number | null;
  kategori_id: number | null;
  judul: string;
  deskripsi: string;
  alamat_lokasi: string;
  foto: string | null;
  status: StatusLaporanDB;
  created_at: Date;
  updated_at: Date;
  nama_pengirim: string | null;
  nama_kategori: string | null;
  no_telepon: string | null;
}

export interface RiwayatStatus extends RowDataPacket {
  id: number;
  laporan_id: number;
  status: StatusLaporanDB;
  catatan: string | null;
  created_at: Date;
}

export async function getAllLaporan(): Promise<Laporan[]> {
  const [rows] = await db.query<Laporan[]>(
    `SELECT
      l.id,
      l.warga_id,
      l.kategori_id,
      l.judul,
      l.deskripsi,
      l.alamat_lokasi,
      l.foto,
      l.status,
      l.created_at,
      l.updated_at,
      COALESCE(u.nama, w.nama) AS nama_pengirim,
      w.no_telepon AS no_telepon,
      k.nama_kategori AS nama_kategori
    FROM laporan l
    LEFT JOIN warga w ON l.warga_id = w.id
    LEFT JOIN users u ON w.user_id = u.id
    LEFT JOIN kategori_laporan k ON l.kategori_id = k.id
    ORDER BY l.created_at DESC, l.id DESC`
  );

  return rows;
}

// Mengambil laporan dengan pagination, pencarian, filter status, dan pengurutan.
export async function getLaporanPaginated(
  limit: number,
  offset: number,
  search = "",
  status = "",
  sort = "Terbaru"
): Promise<Laporan[]> {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (search.trim()) {
    conditions.push(`(
      l.judul LIKE ?
      OR l.alamat_lokasi LIKE ?
      OR COALESCE(u.nama, w.nama) LIKE ?
      OR w.no_telepon LIKE ?
      OR k.nama_kategori LIKE ?
    )`);

    const keyword = `%${search.trim()}%`;

    params.push(
      keyword,
      keyword,
      keyword,
      keyword,
      keyword
    );
  }

  if (status) {
    conditions.push("l.status = ?");
    params.push(status);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const orderClause =
    sort === "Terlama"
      ? "ORDER BY l.created_at ASC, l.id ASC"
      : "ORDER BY l.created_at DESC, l.id DESC";

  const [rows] = await db.query<Laporan[]>(
    `SELECT
      l.id,
      l.warga_id,
      l.kategori_id,
      l.judul,
      l.deskripsi,
      l.alamat_lokasi,
      l.foto,
      l.status,
      l.created_at,
      l.updated_at,
      COALESCE(u.nama, w.nama) AS nama_pengirim,
      w.no_telepon AS no_telepon,
      k.nama_kategori AS nama_kategori
    FROM laporan l
    LEFT JOIN warga w ON l.warga_id = w.id
    LEFT JOIN users u ON w.user_id = u.id
    LEFT JOIN kategori_laporan k ON l.kategori_id = k.id
    ${whereClause}
    ${orderClause}
    LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return rows;
}

// Menghitung total laporan berdasarkan pencarian dan filter status.
export async function getTotalLaporan(
  search = "",
  status = ""
): Promise<number> {
  const conditions: string[] = [];
  const params: string[] = [];

  if (search.trim()) {
    conditions.push(`(
      l.judul LIKE ?
      OR l.alamat_lokasi LIKE ?
      OR COALESCE(u.nama, w.nama) LIKE ?
      OR w.no_telepon LIKE ?
      OR k.nama_kategori LIKE ?
    )`);

    const keyword = `%${search.trim()}%`;

    params.push(
      keyword,
      keyword,
      keyword,
      keyword,
      keyword
    );
  }

  if (status) {
    conditions.push("l.status = ?");
    params.push(status);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS total
     FROM laporan l
     LEFT JOIN warga w ON l.warga_id = w.id
     LEFT JOIN users u ON w.user_id = u.id
     LEFT JOIN kategori_laporan k ON l.kategori_id = k.id
     ${whereClause}`,
    params
  );

  return Number(rows[0].total);
}

export async function getLaporanById(
  id: number
): Promise<Laporan | null> {
  const [rows] = await db.query<Laporan[]>(
    `SELECT
      l.id,
      l.warga_id,
      l.kategori_id,
      l.judul,
      l.deskripsi,
      l.alamat_lokasi,
      l.foto,
      l.status,
      l.created_at,
      l.updated_at,
      COALESCE(u.nama, w.nama) AS nama_pengirim,
      w.no_telepon AS no_telepon,
      k.nama_kategori AS nama_kategori
    FROM laporan l
    LEFT JOIN warga w ON l.warga_id = w.id
    LEFT JOIN users u ON w.user_id = u.id
    LEFT JOIN kategori_laporan k ON l.kategori_id = k.id
    WHERE l.id = ?`,
    [id]
  );

  return rows[0] ?? null;
}

export async function getRiwayatStatusLaporan(
  laporanId: number
): Promise<RiwayatStatus[]> {
  const [rows] = await db.query<RiwayatStatus[]>(
    `SELECT id, laporan_id, status, catatan, created_at
     FROM riwayat_status_laporan
     WHERE laporan_id = ?
     ORDER BY created_at ASC, id ASC`,
    [laporanId]
  );

  return rows;
}

export async function updateLaporanStatus(
  id: number,
  status: StatusLaporanDB,
  catatan: string | null = null
): Promise<{
  updated: boolean;
  previousStatus: StatusLaporanDB;
  currentStatus: StatusLaporanDB;
} | null> {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT status
       FROM laporan
       WHERE id = ?
       FOR UPDATE`,
      [id]
    );

    if (rows.length === 0) {
      await connection.rollback();
      return null;
    }

    const previousStatus = rows[0].status as StatusLaporanDB;

    if (previousStatus === status) {
      await connection.commit();

      return {
        updated: false,
        previousStatus,
        currentStatus: status,
      };
    }

    await connection.query(
      `UPDATE laporan
       SET status = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, id]
    );

    await connection.query<ResultSetHeader>(
      `INSERT INTO riwayat_status_laporan
       (laporan_id, status, catatan)
       VALUES (?, ?, ?)`,
      [id, status, catatan]
    );

    await connection.commit();

    return {
      updated: true,
      previousStatus,
      currentStatus: status,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
