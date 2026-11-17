
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import {
  DashboardHeaderContext,
  type DashboardHeaderConfig,
} from "./DashboardHeaderContext";

type NotificationItem = {
  id: number;
  user_id: number;
  laporan_id: number | null;
  type: "laporan_baru" | "status_laporan";
  title: string;
  message: string;
  is_read: number;
  created_at: string;
  read_at: string | null;
};

type NotificationResponse = {
  success: boolean;
  data?: NotificationItem[];
  unreadCount?: number;
  message?: string;
};

function formatNotificationDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { onProfile } = useAppNavigation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [headerConfig, setHeaderConfig] =
    useState<DashboardHeaderConfig | null>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notificationError, setNotificationError] = useState("");

  const fetchNotifications = useCallback(async () => {
    setLoadingNotifications(true);
    setNotificationError("");

    try {
      const response = await fetch("/api/notification", {
        method: "GET",
        cache: "no-store",
      });

      const result: NotificationResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal mengambil notifikasi."
        );
      }

      setNotifications(result.data ?? []);
      setUnreadCount(Number(result.unreadCount ?? 0));
    } catch (error) {
      console.error("Gagal mengambil notifikasi:", error);
      setNotificationError(
        error instanceof Error
          ? error.message
          : "Gagal mengambil notifikasi."
      );
    } finally {
      setLoadingNotifications(false);
    }
  }, []);

  useEffect(() => {
    if (notificationOpen) {
      void fetchNotifications();
    }
  }, [notificationOpen, fetchNotifications]);

  const markAsRead = async (notificationId: number) => {
    try {
      const response = await fetch("/api/notification", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "read",
          notificationId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal menandai notifikasi."
        );
      }

      await fetchNotifications();
    } catch (error) {
      console.error("Gagal menandai notifikasi:", error);
      setNotificationError(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui notifikasi."
      );
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch("/api/notification", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "read-all",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal membaca semua notifikasi."
        );
      }

      await fetchNotifications();
    } catch (error) {
      console.error("Gagal membaca semua notifikasi:", error);
      setNotificationError(
        error instanceof Error
          ? error.message
          : "Gagal memperbarui notifikasi."
      );
    }
  };

  const notificationContent = (
    <div className="max-h-[380px] overflow-y-auto">
      {unreadCount > 0 && (
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-[11px] font-semibold text-[#00A879] hover:underline"
          >
            Tandai semua dibaca
          </button>
        </div>
      )}

      {loadingNotifications && notifications.length === 0 && (
        <p className="py-6 text-center text-[12px] text-[#64748B]">
          Memuat notifikasi...
        </p>
      )}

      {notificationError && (
        <p className="py-3 text-center text-[12px] text-red-500">
          {notificationError}
        </p>
      )}

      {!loadingNotifications &&
        notifications.length === 0 &&
        !notificationError && (
          <p className="py-6 text-center text-[12px] text-[#64748B]">
            Belum ada notifikasi.
          </p>
        )}

      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`border-b border-[#E1E7ED] py-3 last:border-0 ${
            Number(notification.is_read) === 0
              ? "bg-[#F0FDF8]"
              : "bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-[#14294A]">
                {notification.title}
              </p>

              <p className="mt-1 text-[11px] leading-relaxed text-[#64748B]">
                {notification.message}
              </p>

              <p className="mt-2 text-[10px] text-[#94A3B8]">
                {formatNotificationDate(notification.created_at)}
              </p>
            </div>

            {Number(notification.is_read) === 0 && (
              <button
                type="button"
                onClick={() => markAsRead(notification.id)}
                className="shrink-0 text-[10px] font-semibold text-[#00A879] hover:underline"
              >
                Tandai dibaca
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <DashboardHeaderContext.Provider
      value={{
        setHeaderConfig,
        notificationOpen,
        setNotificationOpen,
      }}
    >
      <div className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
        <DashboardSidebar />

        <section className="ml-[244px] min-h-screen">
          <DashboardNavbar
            notificationOpen={notificationOpen}
            onToggleNotification={() =>
              setNotificationOpen((previous) => !previous)
            }
            onCloseNotification={() => setNotificationOpen(false)}
            onProfile={onProfile}
            searchValue={headerConfig?.searchValue}
            onSearchChange={headerConfig?.onSearchChange}
            onSearchSubmit={(value) => {
              const query = value.trim();

              if (!query) return;

              router.push(
                `/pencarian?q=${encodeURIComponent(query)}`
              );
            }}
            searchPlaceholder={headerConfig?.searchPlaceholder}
            notificationContent={notificationContent}
            unreadCount={unreadCount}
          />

          {children}
        </section>
      </div>
    </DashboardHeaderContext.Provider>
  );
}
