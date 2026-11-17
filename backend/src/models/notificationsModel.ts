
import db from "../config/db.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

interface Notification extends RowDataPacket {
  id: number;
  user_id: number;
  laporan_id: number | null;
  type: "laporan_baru" | "status_laporan";
  title: string;
  message: string;
  is_read: number;
  created_at: Date;
  read_at: Date | null;
}

interface AdminUser extends RowDataPacket {
  id: number;
}

interface CountRow extends RowDataPacket {
  unread_count: number;
}

export async function getAdminNotifications(userId: number) {
  const [admins] = await db.execute<AdminUser[]>(
    "SELECT id FROM users WHERE id = ? AND role = 'admin'",
    [userId]
  );

  if (admins.length === 0) return null;

  const [notifications] = await db.execute<Notification[]>(
    `SELECT *
     FROM notifications
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT 50`,
    [userId]
  );

  const [counts] = await db.execute<CountRow[]>(
    `SELECT COUNT(*) AS unread_count
     FROM notifications
     WHERE user_id = ? AND is_read = 0`,
    [userId]
  );

  return {
    notifications,
    unreadCount: Number(counts[0]?.unread_count ?? 0),
  };
}

export async function markNotificationAsRead(
  userId: number,
  notificationId: number
): Promise<boolean> {
  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE notifications
     SET is_read = 1, read_at = CURRENT_TIMESTAMP
     WHERE id = ? AND user_id = ? AND is_read = 0`,
    [notificationId, userId]
  );

  return result.affectedRows > 0;
}

export async function markAllNotificationsAsRead(
  userId: number
): Promise<void> {
  await db.execute(
    `UPDATE notifications
     SET is_read = 1, read_at = CURRENT_TIMESTAMP
     WHERE user_id = ? AND is_read = 0`,
    [userId]
  );
}

export async function createNotificationForAdmins(
  laporanId: number,
  type: "laporan_baru" | "status_laporan",
  title: string,
  message: string
): Promise<void> {
  const [admins] = await db.execute<AdminUser[]>(
    "SELECT id FROM users WHERE role = 'admin'"
  );

  for (const admin of admins) {
    await db.execute(
      `INSERT INTO notifications
       (user_id, laporan_id, type, title, message)
       VALUES (?, ?, ?, ?, ?)`,
      [admin.id, laporanId, type, title, message]
    );
  }
}
