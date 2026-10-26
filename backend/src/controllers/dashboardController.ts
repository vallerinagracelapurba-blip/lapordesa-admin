
import { Request, Response } from "express";
import db from "../config/db.js";
import { RowDataPacket } from "mysql2";

interface DashboardRow extends RowDataPacket {
  total: number;
  menunggu: number;
  diproses: number;
  selesai: number;
}

const dashboardController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [rows] = await db.query<DashboardRow[]>(`
      SELECT
        COUNT(*) AS total,
        COALESCE(SUM(CASE
          WHEN status = 'Menunggu' THEN 1 ELSE 0
        END), 0) AS menunggu,
        COALESCE(SUM(CASE
          WHEN status = 'Diproses' THEN 1 ELSE 0
        END), 0) AS diproses,
        COALESCE(SUM(CASE
          WHEN status = 'Selesai' THEN 1 ELSE 0
        END), 0) AS selesai
      FROM laporan
    `);

    res.status(200).json({
      success: true,
      data: rows[0],
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data dashboard",
    });
  }
};

export default dashboardController;
