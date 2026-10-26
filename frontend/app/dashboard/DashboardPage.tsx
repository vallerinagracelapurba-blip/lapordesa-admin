
"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "./components/DashboardNavbar";
import DashboardOverview from "./components/DashboardOverview";
import DashboardSidebar from "./components/DashboardSidebar";

type DashboardStats = {
  total: number;
  menunggu: number;
  diproses: number;
  selesai: number;
  ditolak: number;
};

export default function DashboardPage({
  onDataLaporan,
  onDataWarga,
  onOpenDetail,
  onPengaturan,
  onProfile,
}: {
  onDataLaporan: () => void;
  onDataWarga: () => void;
  onOpenDetail: () => void;
  onPengaturan: () => void;
  onProfile?: () => void;
}) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    menunggu: 0,
    diproses: 0,
    selesai: 0,
    ditolak: 0,
  });

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard"
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dashboard");
        }

        const result = await response.json();
        const data = result.data;

        setStats({
          total: Number(data?.total) || 0,
          menunggu: Number(data?.menunggu) || 0,
          diproses: Number(data?.diproses) || 0,
          selesai: Number(data?.selesai) || 0,
          ditolak: Number(data?.ditolak) || 0,
        });
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      <DashboardSidebar
        onDataLaporan={onDataLaporan}
        onDataWarga={onDataWarga}
        onPengaturan={onPengaturan}
      />

      <section className="ml-[244px] min-h-screen">
        <DashboardNavbar
          notificationOpen={notificationOpen}
          onToggleNotification={() =>
            setNotificationOpen((previous) => !previous)
          }
          onCloseNotification={() => setNotificationOpen(false)}
          onProfile={onProfile}
        />

        <DashboardOverview
          stats={stats}
          onOpenDetail={onOpenDetail}
          onDataLaporan={onDataLaporan}
        />
      </section>
    </main>
  );
}
