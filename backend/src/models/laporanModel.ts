
import db from "../config/db.js";
import type { RowDataPacket } from "mysql2";

export interface Laporan extends RowDataPacket {
  id: number;
  warga_id: number | null;
  kategori_id: number | null;
  judul: string;
  deskripsi: string;
  alamat_lokasi: string;
  foto: string | null;
  status: "Menunggu" | "Diproses" | "Selesai" | "Ditolak";
  created_at: Date;
  updated_at: Date;
  nama_pengirim: string | null;
  nama_kategori: string | null;
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
    ORDER BY l.created_at DESC`
  );

  return rows;
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

export async function updateLaporanStatus(
  id: number,
  status: Laporan["status"]
): Promise<boolean> {
  const [result] = await db.query(
    `UPDATE laporan
     SET status = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [status, id]
  );

  const affectedRows = (result as { affectedRows: number }).affectedRows;

  return affectedRows > 0;
}
