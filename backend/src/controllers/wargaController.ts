
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

    if (!Number.isSafeInteger(id) || id <= 0) {
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
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body)
    ) {
      res.status(400).json({
        success: false,
        message: "Body request tidak valid.",
      });
      return;
    }

    const { nama, alamat, no_telepon } = req.body;

    if (typeof nama !== "string" || !nama.trim()) {
      res.status(400).json({
        success: false,
        message: "Nama warga wajib diisi.",
      });
      return;
    }

    const namaBersih = nama.trim();

    if (namaBersih.length > 100) {
      res.status(400).json({
        success: false,
        message: "Nama maksimal 100 karakter.",
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

    const alamatBersih =
      typeof alamat === "string" ? alamat.trim() : "";

    if (alamatBersih.length > 255) {
      res.status(400).json({
        success: false,
        message: "Alamat maksimal 255 karakter.",
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

    const teleponBersih =
      typeof no_telepon === "string"
        ? no_telepon.trim()
        : "";

    if (
      teleponBersih &&
      !/^\d{10,15}$/.test(teleponBersih)
    ) {
      res.status(400).json({
        success: false,
        message: "Nomor HP harus berisi 10 sampai 15 angka.",
      });
      return;
    }

    const warga = await createWarga({
      nama: namaBersih,
      alamat: alamatBersih || null,
      no_telepon: teleponBersih || null,
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

    if (!Number.isSafeInteger(id) || id <= 0) {
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
