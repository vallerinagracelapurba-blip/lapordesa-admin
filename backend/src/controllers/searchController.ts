
import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2";
import db from "../config/db.js";

export async function searchAll(req: Request, res: Response) {
  try {
    const q = String(req.query.q || "").trim();

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Kata kunci pencarian wajib diisi.",
      });
    }

    if (q.length > 150) {
      return res.status(400).json({
        success: false,
        message: "Kata kunci maksimal 150 karakter.",
      });
    }

    const keyword = `%${q}%`;

    const [laporan] = await db.query<RowDataPacket[]>(
      `SELECT
        l.id,
        l.judul,
        l.deskripsi,
        l.alamat_lokasi,
        l.foto,
        l.status,
        l.created_at,
        l.updated_at,
        COALESCE(u.nama, w.nama) AS nama_pengirim,
        w.no_telepon,
        k.nama_kategori
      FROM laporan l
      LEFT JOIN warga w ON l.warga_id = w.id
      LEFT JOIN users u ON w.user_id = u.id
      LEFT JOIN kategori_laporan k ON l.kategori_id = k.id
      WHERE
        l.judul LIKE ?
        OR l.deskripsi LIKE ?
        OR l.alamat_lokasi LIKE ?
        OR l.status LIKE ?
        OR k.nama_kategori LIKE ?
        OR COALESCE(u.nama, w.nama) LIKE ?
        OR w.no_telepon LIKE ?
      ORDER BY l.created_at DESC`,
      [
        keyword,
        keyword,
        keyword,
        keyword,
        keyword,
        keyword,
        keyword,
      ]
    );

    const [warga] = await db.query<RowDataPacket[]>(
      `SELECT
        id,
        user_id,
        nik,
        nama,
        alamat,
        no_telepon,
        created_at
      FROM warga
      WHERE
        nik LIKE ?
        OR nama LIKE ?
        OR alamat LIKE ?
        OR no_telepon LIKE ?
      ORDER BY created_at DESC`,
      [keyword, keyword, keyword, keyword]
    );

    return res.json({
      success: true,
      data: {
        laporan,
        warga,
      },
      totals: {
        laporan: laporan.length,
        warga: warga.length,
      },
    });
  } catch (error) {
    console.error("Global search error:", error);

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat melakukan pencarian.",
    });
  }
}
