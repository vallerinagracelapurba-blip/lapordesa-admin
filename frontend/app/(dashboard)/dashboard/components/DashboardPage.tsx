
"use client";

import type { DashboardStats } from "@/types/domain";
import { apiFetch } from "@/services/api";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useEffect, useState } from "react";
import DashboardOverview from "./DashboardOverview";

export type DashboardRecentReport = {
  id: number;
  judul: string;
  alamat_lokasi: string;
  status: string;
  foto: string | null;
  created_at: string;
  nama_kategori: string | null;
};

export type DashboardCategory = {
  nama_kategori: string;
  total: number;
};

export type DashboardTrend = {
  tanggal: string;
  total: number;
};

export default function DashboardPage() {
  const { onDataLaporan, onOpenDetail } = useAppNavigation();

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    menunggu: 0,
    diproses: 0,
    selesai: 0,
    ditolak: 0,
  });

  const [recentReports, setRecentReports] = useState<DashboardRecentReport[]>([]);
  const [categorySummary, setCategorySummary] = useState<DashboardCategory[]>([]);
  const [trend, setTrend] = useState<DashboardTrend[]>([]);

  const [summaryDays, setSummaryDays] = useState(7);
  const [trendDays, setTrendDays] = useState(7);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await apiFetch(
          `/dashboard?summaryDays=${summaryDays}&trendDays=${trendDays}`
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dashboard");
        }

        const result = await response.json();
        const data = result.data;

        setStats({
          total: Number(data?.stats?.total) || 0,
          menunggu: Number(data?.stats?.menunggu) || 0,
          diproses: Number(data?.stats?.diproses) || 0,
          selesai: Number(data?.stats?.selesai) || 0,
          ditolak: Number(data?.stats?.ditolak) || 0,
        });

        setRecentReports(data?.recentReports ?? []);
        setCategorySummary(data?.categorySummary ?? []);
        setTrend(data?.trend ?? []);
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      }
    }

    fetchDashboard();
  }, [summaryDays, trendDays]);

  return (
    <main className="min-h-screen">
      <DashboardOverview
        stats={stats}
        recentReports={recentReports}
        categorySummary={categorySummary}
        trend={trend}
        summaryDays={summaryDays}
        trendDays={trendDays}
        onSummaryDaysChange={setSummaryDays}
        onTrendDaysChange={setTrendDays}
        onOpenDetail={onOpenDetail}
        onDataLaporan={onDataLaporan}
      />
    </main>
  );
}
