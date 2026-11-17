
import db from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface AdminProfile extends RowDataPacket {
  id: number;
  nama: string;
  email: string;
  role: string;
  jabatan: string | null;
  no_telepon: string | null;
  alamat: string | null;
}

export interface UpdateProfileData {
  nama: string;
  email: string;
  jabatan: string | null;
  no_telepon: string | null;
  alamat: string | null;
}

export async function getAdminProfileById(
  id: number
): Promise<AdminProfile | null> {
  const [rows] = await db.query<AdminProfile[]>(
    `SELECT id, nama, email, role, jabatan, no_telepon, alamat
     FROM users
     WHERE id = ? AND role = 'admin'
     LIMIT 1`,
    [id]
  );

  return rows[0] ?? null;
}

export async function updateAdminProfile(
  id: number,
  data: UpdateProfileData
): Promise<void> {
  await db.query<ResultSetHeader>(
    `UPDATE users
     SET nama = ?, email = ?, jabatan = ?, no_telepon = ?, alamat = ?
     WHERE id = ? AND role = 'admin'`,
    [
      data.nama,
      data.email,
      data.jabatan,
      data.no_telepon,
      data.alamat,
      id,
    ]
  );
}
