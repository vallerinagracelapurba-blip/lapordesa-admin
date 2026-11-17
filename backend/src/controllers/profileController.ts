
import type { Request, Response } from "express";
import {
  getAdminProfileById,
  updateAdminProfile,
} from "../models/profileModel.js";

export async function getProfileController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID pengguna tidak valid.",
      });
    }

    const profile = await getAdminProfileById(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profil admin tidak ditemukan.",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data profil.",
    });
  }
}

export async function updateProfileController(
  req: Request,
  res: Response
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID pengguna tidak valid.",
      });
    }

    const nama =
      typeof req.body.nama === "string" ? req.body.nama.trim() : "";

    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    const jabatan =
      typeof req.body.jabatan === "string"
        ? req.body.jabatan.trim()
        : null;

    const no_telepon =
      typeof req.body.no_telepon === "string"
        ? req.body.no_telepon.trim()
        : null;

    const alamat =
      typeof req.body.alamat === "string"
        ? req.body.alamat.trim()
        : null;

    if (!nama || !email) {
      return res.status(400).json({
        success: false,
        message: "Nama dan email wajib diisi.",
      });
    }

    if (nama.length > 100 || email.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Nama atau email terlalu panjang.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid.",
      });
    }

    if (jabatan && jabatan.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Jabatan terlalu panjang.",
      });
    }

    if (no_telepon && no_telepon.length > 30) {
      return res.status(400).json({
        success: false,
        message: "Nomor telepon terlalu panjang.",
      });
    }

    const existingProfile = await getAdminProfileById(id);

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Profil admin tidak ditemukan.",
      });
    }

    await updateAdminProfile(id, {
      nama,
      email,
      jabatan,
      no_telepon,
      alamat,
    });

    const updatedProfile = await getAdminProfileById(id);

    return res.status(200).json({
      success: true,
      message: "Profil berhasil diperbarui.",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Update profile error:", error);

    const errorCode =
      error && typeof error === "object" && "code" in error
        ? error.code
        : undefined;

    if (errorCode === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "Email sudah digunakan oleh akun lain.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui profil.",
    });
  }
}
