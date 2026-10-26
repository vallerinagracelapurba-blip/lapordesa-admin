
import type { Request, Response } from "express";
import {
  getAllLaporan,
  getLaporanById,
  updateLaporanStatus,
} from "../models/laporanModel.js";

const STATUS_VALID = [
  "Menunggu",
  "Diproses",
  "Selesai",
  "Ditolak",
] as const;

export async function getLaporan(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const laporan = await getAllLaporan();

    console.log(
      "HASIL QUERY LAPORAN:",
      JSON.stringify(laporan)
    );

    res.status(200).json({
      success: true,
      total: laporan.length,
      data: laporan,
    });
  } catch (error) {
    console.error("Gagal mengambil data laporan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data laporan.",
    });
  }
}

export async function getLaporanDetail(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "ID laporan tidak valid.",
      });
      return;
    }

    const laporan = await getLaporanById(id);

    if (!laporan) {
      res.status(404).json({
        success: false,
        message: "Laporan tidak ditemukan.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: laporan,
    });
  } catch (error) {
    console.error("Gagal mengambil detail laporan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail laporan.",
    });
  }
}

export async function updateStatusLaporan(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const { status } = req.body as { status?: string };

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "ID laporan tidak valid.",
      });
      return;
    }

    if (
      typeof status !== "string" ||
      !STATUS_VALID.includes(status as (typeof STATUS_VALID)[number])
    ) {
      res.status(400).json({
        success: false,
        message: "Status laporan tidak valid.",
      });
      return;
    }

    const berhasil = await updateLaporanStatus(
      id,
      status as (typeof STATUS_VALID)[number]
    );

    if (!berhasil) {
      const laporan = await getLaporanById(id);

      if (!laporan) {
        res.status(404).json({
          success: false,
          message: "Laporan tidak ditemukan.",
        });
        return;
      }
    }

    const laporanTerbaru = await getLaporanById(id);

    res.status(200).json({
      success: true,
      message: "Status laporan berhasil diperbarui.",
      data: laporanTerbaru,
    });
  } catch (error) {
    console.error("Gagal memperbarui status laporan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui status laporan.",
    });
  }
}
