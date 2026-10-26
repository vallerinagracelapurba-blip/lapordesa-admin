
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../models/userModel.js";

export async function getUserByEmailController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email = String(req.params.email ?? "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        success: false,
        message: "Format email tidak valid.",
      });
      return;
    }

    const user = await getUserByEmail(email);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User tidak ditemukan.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Gagal mengambil user:", error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil user.",
    });
  }
}

export async function loginController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email = String(req.body?.email ?? "").trim();
    const password = String(req.body?.password ?? "");

    if (
      !email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !password
    ) {
      res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi dengan benar.",
      });
      return;
    }

    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({
        success: false,
        message: "Email atau password salah.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login berhasil.",
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login gagal:", error);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat login.",
    });
  }
}
