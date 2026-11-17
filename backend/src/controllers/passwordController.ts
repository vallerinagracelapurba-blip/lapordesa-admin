
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import {
  getUserById,
  updateUserPassword,
} from "../models/userModel.js";

export async function changePasswordController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const currentPassword = String(req.body?.currentPassword ?? "");
    const newPassword = String(req.body?.newPassword ?? "");
    const confirmPassword = String(req.body?.confirmPassword ?? "");

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        message: "ID pengguna tidak valid.",
      });
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Semua kolom kata sandi wajib diisi.",
      });
      return;
    }

    if (Buffer.byteLength(newPassword, "utf8") < 8) {
      res.status(400).json({
        success: false,
        message: "Kata sandi baru minimal 8 karakter.",
      });
      return;
    }

    if (Buffer.byteLength(newPassword, "utf8") > 72) {
      res.status(400).json({
        success: false,
        message: "Kata sandi baru maksimal 72 byte.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Konfirmasi kata sandi baru tidak cocok.",
      });
      return;
    }

    if (currentPassword === newPassword) {
      res.status(400).json({
        success: false,
        message: "Kata sandi baru harus berbeda dari kata sandi lama.",
      });
      return;
    }

    const user = await getUserById(id);

    if (!user || user.role !== "admin") {
      res.status(404).json({
        success: false,
        message: "Akun admin tidak ditemukan.",
      });
      return;
    }

    const passwordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordValid) {
      res.status(401).json({
        success: false,
        message: "Kata sandi lama tidak sesuai.",
      });
      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    await updateUserPassword(id, passwordHash);

    res.status(200).json({
      success: true,
      message: "Kata sandi berhasil diperbarui.",
    });
  } catch (error) {
    console.error("Change password error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui kata sandi.",
    });
  }
}
