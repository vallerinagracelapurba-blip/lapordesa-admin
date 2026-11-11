
import type { Request, Response } from "express";
import type { RowDataPacket } from "mysql2";
import db from "../config/db.js";

interface DashboardStatsRow extends RowDataPacket {
  total: number;
  menunggu: number;
  diproses: number;
  selesai: number;
  ditolak: number;
}

interface RecentReportRow extends RowDataPacket {
  id: number;
  judul: string;
  alamat_lokasi: string;
  status: string;
  foto: string | null;
  created_at: Date;
  nama_kategori: string | null;
}

interface CategoryRow extends RowDataPacket {
  nama_kategori: string;
  total: number;
}

interface TrendRow extends RowDataPacket {
  tanggal: string;
  total: number;
}

function getPeriod(value: unknown): number {
  const parsed = Number(value);

  return [7, 14, 30].includes(parsed) ? parsed : 7;
}

const dashboardController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const summaryDays = getPeriod(req.query.summaryDays);
    const trendDays = getPeriod(req.query.trendDays);

    const summaryStart = summaryDays - 1;
    const trendStart = trendDays - 1;

    const [
      [statsRows],
      [recentReports],
      [categorySummary],
      [trend],
    ] = await Promise.all([
      // Statistik seluruh laporan
      db.query<DashboardStatsRow[]>(`
        SELECT
          COUNT(*) AS total,
          COALESCE(SUM(status = 'Menunggu'), 0) AS menunggu,
          COALESCE(SUM(status = 'Diproses'), 0) AS diproses,
          COALESCE(SUM(status = 'Selesai'), 0) AS selesai,
          COALESCE(SUM(status = 'Ditolak'), 0) AS ditolak
        FROM laporan
      `),

      // Empat laporan terbaru
      db.query<RecentReportRow[]>(`
        SELECT
          l.id,
          l.judul,
          l.alamat_lokasi,
          l.status,
          l.foto,
          l.created_at,
          k.nama_kategori
        FROM laporan l
        LEFT JOIN kategori_laporan k
          ON l.kategori_id = k.id
        ORDER BY l.created_at DESC, l.id DESC
        LIMIT 4
      `),

      // Ringkasan kategori sesuai periode
      db.query<CategoryRow[]>(
        `
          SELECT
            COALESCE(k.nama_kategori, 'Tanpa Kategori')
              AS nama_kategori,
            COUNT(*) AS total
          FROM laporan l
          LEFT JOIN kategori_laporan k
            ON l.kategori_id = k.id
          WHERE l.created_at >= DATE_SUB(
            CURDATE(), INTERVAL ${summaryStart} DAY
          )
            AND l.created_at < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
          GROUP BY k.id, k.nama_kategori
          ORDER BY total DESC
        `
      ),

      // Tren laporan per tanggal
      db.query<TrendRow[]>(
        `
          SELECT
            DATE_FORMAT(l.created_at, '%Y-%m-%d') AS tanggal,
            COUNT(*) AS total
          FROM laporan l
          WHERE l.created_at >= DATE_SUB(
            CURDATE(), INTERVAL ${trendStart} DAY
          )
            AND l.created_at < DATE_ADD(CURDATE(), INTERVAL 1 DAY)
          GROUP BY DATE(l.created_at)
          ORDER BY DATE(l.created_at) ASC
        `
      ),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: statsRows[0],
        recentReports,
        categorySummary,
        trend,
      },
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
