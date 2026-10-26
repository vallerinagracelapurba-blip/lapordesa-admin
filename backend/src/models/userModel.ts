
import db from "../config/db.js";
import type { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  id: number;
  nama: string;
  email: string;
  password: string;
  role: "admin" | "warga";
  created_at: Date;
}

export async function getUserByEmail(
  email: string
): Promise<User | null> {
  const [rows] = await db.query<User[]>(
    `SELECT id, nama, email, password, role, created_at
     FROM users
     WHERE email = ?
     LIMIT 1`,
    [email]
  );

  return rows[0] ?? null;
}

export async function getUserById(
  id: number
): Promise<User | null> {
  const [rows] = await db.query<User[]>(
    `SELECT id, nama, email, password, role, created_at
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0] ?? null;
}
