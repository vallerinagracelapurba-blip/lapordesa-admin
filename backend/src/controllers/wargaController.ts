
import type { Request, Response } from "express";
import {
  getAllWarga,
  getWargaById,
} from "../models/wargaModel.js";

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
