
import type { Request, Response } from "express";
import {
  getAllWarga,
  getWargaById,
  createWarga,
  getJumlahLaporanWarga,
  deleteWarga,
} from "../models/wargaModel.js";

// GET semua warga
export async function getWarga(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const warga = await getAllWarga();

    res.status(200).json({
      success: true,
      total: warga.length,
      data: warga,
    });
  } catch (error) {
    console.error("Gagal mengambil data warga:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data warga.",
    });
  }
}

// GET detail warga berdasarkan ID
export async function getWargaDetail(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "ID warga tidak valid.",
      });
      return;
    }

    const warga = await getWargaById(id);

    if (!warga) {
      res.status(404).json({
        success: false,
        message: "Warga tidak ditemukan.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: warga,
    });
  } catch (error) {
    console.error("Gagal mengambil detail warga:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail warga.",
    });
  }
}

// POST tambah warga baru
export async function postWarga(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { nama, alamat, no_telepon } = req.body;

    if (typeof nama !== "string" || !nama.trim()) {
      res.status(400).json({
        success: false,
        message: "Nama warga wajib diisi.",
      });
      return;
    }

    if (
      alamat !== undefined &&
      alamat !== null &&
      typeof alamat !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Format alamat tidak valid.",
      });
      return;
    }

    if (
      no_telepon !== undefined &&
      no_telepon !== null &&
      typeof no_telepon !== "string"
    ) {
      res.status(400).json({
        success: false,
        message: "Format nomor HP tidak valid.",
      });
      return;
    }

    // Validasi nomor HP: hanya boleh berisi angka.
    if (
      typeof no_telepon === "string" &&
      no_telepon.trim() !== "" &&
      !/^\d+$/.test(no_telepon.trim())
    ) {
      res.status(400).json({
        success: false,
        message: "Nomor HP hanya boleh berisi angka.",
      });
      return;
    }

    const warga = await createWarga({
      nama: nama.trim(),
      alamat:
        typeof alamat === "string" && alamat.trim()
          ? alamat.trim()
          : null,
      no_telepon:
        typeof no_telepon === "string" && no_telepon.trim()
          ? no_telepon.trim()
          : null,
    });

    if (!warga) {
      res.status(500).json({
        success: false,
        message: "Data warga gagal disimpan.",
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Warga berhasil ditambahkan.",
      data: warga,
    });
  } catch (error) {
    console.error("Gagal menambahkan warga:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menambahkan data warga.",
    });
  }
}

// DELETE warga berdasarkan ID
export async function deleteWargaById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "ID warga tidak valid.",
      });
      return;
    }

    const warga = await getWargaById(id);

    if (!warga) {
      res.status(404).json({
        success: false,
        message: "Warga tidak ditemukan.",
      });
      return;
    }

    const jumlahLaporan = await getJumlahLaporanWarga(id);

    if (jumlahLaporan > 0) {
      res.status(409).json({
        success: false,
        message: `Warga tidak dapat dihapus karena masih memiliki ${jumlahLaporan} laporan.`,
      });
      return;
    }

    const berhasil = await deleteWarga(id);

    if (!berhasil) {
      res.status(404).json({
        success: false,
        message: "Warga tidak ditemukan atau sudah dihapus.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Data warga berhasil dihapus.",
    });
  } catch (error) {
    console.error("Gagal menghapus warga:", error);

    res.status(500).json({
      success: false,
      message: "Gagal menghapus data warga.",
    });
  }
}
