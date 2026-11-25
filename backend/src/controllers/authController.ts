
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../models/userModel.js";

export async function getUserByEmailController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const email =
      typeof req.params.email === "string"
        ? req.params.email.trim()
        : "";

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
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
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim()
        : "";

    const password =
      typeof req.body?.password === "string"
        ? req.body.password
        : "";

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !password ||
      password.length > 128
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

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      res.status(500).json({
        success: false,
        message: "Konfigurasi autentikasi server belum tersedia.",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login berhasil.",
      data: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        token,
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
