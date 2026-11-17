
import type { Request, Response } from "express";

import {
  getAllLaporan,
  getLaporanById,
  getRiwayatStatusLaporan,
  updateLaporanStatus,
} from "../models/laporanModel.js";

import { createNotificationForAdmins } from "../models/notificationsModel.js";

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

    const riwayat = await getRiwayatStatusLaporan(id);

    res.status(200).json({
      success: true,
      data: {
        ...laporan,
        riwayat_status: riwayat,
      },
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
    const { status, catatan } = req.body as {
      status?: string;
      catatan?: string;
    };

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

    if (
      catatan !== undefined &&
      typeof catatan !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Catatan harus berupa teks.",
      });
      return;
    }

    const hasilUpdate = await updateLaporanStatus(
      id,
      status as (typeof STATUS_VALID)[number],
      catatan?.trim() || null
    );

    if (!hasilUpdate) {
      res.status(404).json({
        success: false,
        message: "Laporan tidak ditemukan.",
      });
      return;
    }

    if (hasilUpdate.updated) {
      try {
        const laporanSebelumnya = await getLaporanById(id);

        await createNotificationForAdmins(
          id,
          "status_laporan",
          "Status laporan diperbarui",
          `Status laporan "${laporanSebelumnya?.judul || `#${id}`}" berubah dari ${hasilUpdate.previousStatus} menjadi ${hasilUpdate.currentStatus}.`
        );
      } catch (notificationError) {
        console.error(
          "Gagal membuat notifikasi:",
          notificationError
        );
      }
    }

    const laporanTerbaru = await getLaporanById(id);
    const riwayat = await getRiwayatStatusLaporan(id);

    res.status(200).json({
      success: true,
      message: hasilUpdate.updated
        ? "Status laporan berhasil diperbarui."
        : "Status laporan tidak berubah.",
      data: {
        ...laporanTerbaru,
        riwayat_status: riwayat,
      },
    });
  } catch (error) {
    console.error("Gagal memperbarui status laporan:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui status laporan.",
    });
  }
}
