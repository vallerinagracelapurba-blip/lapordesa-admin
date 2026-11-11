
import db from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Warga extends RowDataPacket {
  id: number;
  user_id: number | null;
  nik: string | null;
  nama: string;
  alamat: string | null;
  no_telepon: string | null;
  created_at: Date;
}

// GET semua warga
export async function getAllWarga(): Promise<Warga[]> {
  const [rows] = await db.query<Warga[]>(
    `SELECT
      id,
      user_id,
      nik,
      nama,
      alamat,
      no_telepon,
      created_at
    FROM warga
    ORDER BY created_at DESC`
  );

  return rows;
}

// GET detail warga berdasarkan ID
export async function getWargaById(
  id: number
): Promise<Warga | null> {
  const [rows] = await db.query<Warga[]>(
    "SELECT * FROM warga WHERE id = ?",
    [id]
  );

  return rows[0] ?? null;
}

// POST tambah warga baru
export async function createWarga(data: {
  nama: string;
  alamat: string | null;
  no_telepon: string | null;
}): Promise<Warga | null> {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO warga (nama, alamat, no_telepon)
     VALUES (?, ?, ?)`,
    [data.nama, data.alamat, data.no_telepon]
  );

  return getWargaById(result.insertId);
}

// Cek jumlah laporan milik warga
export async function getJumlahLaporanWarga(
  wargaId: number
): Promise<number> {
  const [rows] = await db.query<RowDataPacket[]>(
    "SELECT COUNT(*) AS total FROM laporan WHERE warga_id = ?",
    [wargaId]
  );

  return Number(rows[0].total);
}

// DELETE warga
export async function deleteWarga(
  id: number
): Promise<boolean> {
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM warga WHERE id = ?",
    [id]
  );

  return result.affectedRows > 0;
}
