
import db from "../config/db.js";
import type { RowDataPacket } from "mysql2";

export interface Warga extends RowDataPacket {
  id: number;
  user_id: number | null;
  nik: string | null;
  nama: string;
  alamat: string | null;
  no_telepon: string | null;
  created_at: Date;
}

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

export async function getWargaById(
  id: number
): Promise<Warga | null> {
  const [rows] = await db.query<Warga[]>(
    "SELECT * FROM warga WHERE id = ?",
    [id]
  );

  return rows[0] ?? null;
}
