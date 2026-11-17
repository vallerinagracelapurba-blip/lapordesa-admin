
import type { Request, Response } from "express";
import {
  getAdminNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../models/notificationsModel.js";

export async function getNotifications(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(400).json({
        success: false,
        message: "ID pengguna tidak valid.",
      });
      return;
    }

    const result = await getAdminNotifications(userId);

    if (!result) {
      res.status(403).json({
        success: false,
        message: "Akses hanya untuk admin.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Notifikasi berhasil diambil.",
      data: result.notifications,
      unreadCount: result.unreadCount,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil notifikasi.",
    });
  }
}

export async function readNotification(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = Number(req.params.userId);
    const notificationId = Number(req.params.notificationId);

    if (
      !Number.isInteger(userId) ||
      userId <= 0 ||
      !Number.isInteger(notificationId) ||
      notificationId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "ID tidak valid.",
      });
      return;
    }

    const updated = await markNotificationAsRead(
      userId,
      notificationId
    );

    if (!updated) {
      res.status(404).json({
        success: false,
        message: "Notifikasi tidak ditemukan atau sudah dibaca.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Notifikasi berhasil ditandai sudah dibaca.",
    });
  } catch (error) {
    console.error("Read notification error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui notifikasi.",
    });
  }
}

export async function readAllNotifications(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(400).json({
        success: false,
        message: "ID pengguna tidak valid.",
      });
      return;
    }

    const result = await getAdminNotifications(userId);

    if (!result) {
      res.status(403).json({
        success: false,
        message: "Akses hanya untuk admin.",
      });
      return;
    }

    await markAllNotificationsAsRead(userId);

    res.status(200).json({
      success: true,
      message: "Semua notifikasi berhasil dibaca.",
    });
  } catch (error) {
    console.error("Read all notifications error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal memperbarui notifikasi.",
    });
  }
}
