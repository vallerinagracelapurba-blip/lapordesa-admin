
"use client";

import { useState } from "react";
import LoginPage from "@/app/components/auth/LoginPage";
import DashboardPage from "@/app/dashboard/DashboardPage";
import DataLaporanPage from "@/app/laporan/DataLaporanPage";
import DetailLaporanPage from "@/app/components/pages/DetailLaporanPage";
import DataWargaPage from "@/app/warga/DataWargaPage";
import DetailProfilWargaPage from "@/app/components/pages/DetailProfilWargaPage";
import PengaturanPage from "@/app/pengaturan/PengaturanPage";
import UbahProfilPage from "@/app/components/pages/UbahProfilPage";

type Page =
  | "dashboard"
  | "laporan"
  | "detail"
  | "warga"
  | "detailWarga"
  | "pengaturan"
  | "ubahProfil";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [laporanId, setLaporanId] = useState<string | number>(1);

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() => {
          setIsLoggedIn(true);
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  if (currentPage === "detail") {
    return (
      <DetailLaporanPage
        laporanId={laporanId}
        onBackToLaporan={() => setCurrentPage("laporan")}
        onBackToDashboard={() => setCurrentPage("dashboard")}
        onDataWarga={() => setCurrentPage("warga")}
        onPengaturan={() => setCurrentPage("pengaturan")}
        onProfile={() => setCurrentPage("ubahProfil")}
      />
    );
  }

  if (currentPage === "ubahProfil") {
    return (
      <UbahProfilPage
        onBackToPengaturan={() => setCurrentPage("pengaturan")}
        onBackToDashboard={() => setCurrentPage("dashboard")}
        onDataLaporan={() => setCurrentPage("laporan")}
        onDataWarga={() => setCurrentPage("warga")}
        onProfile={() => setCurrentPage("ubahProfil")}
      />
    );
  }

  if (currentPage === "laporan") {
    return (
      <DataLaporanPage
        onBackToDashboard={() => setCurrentPage("dashboard")}
        onOpenDetail={(id) => {
          setLaporanId(id);
          setCurrentPage("detail");
        }}
        onDataWarga={() => setCurrentPage("warga")}
        onPengaturan={() => setCurrentPage("pengaturan")}
        onProfile={() => setCurrentPage("ubahProfil")}
      />
    );
  }

  if (currentPage === "detailWarga") {
    return (
      <DetailProfilWargaPage
        onBackToWarga={() => setCurrentPage("warga")}
        onBackToDashboard={() => setCurrentPage("dashboard")}
        onPengaturan={() => setCurrentPage("pengaturan")}
        onProfile={() => setCurrentPage("ubahProfil")}
      />
    );
  }

  if (currentPage === "warga") {
    return (
      <DataWargaPage
        onBackToDashboard={() => setCurrentPage("dashboard")}
        onDataLaporan={() => setCurrentPage("laporan")}
        onOpenDetail={() => setCurrentPage("detailWarga")}
        onTambahWarga={() => {}}
        onPengaturan={() => setCurrentPage("pengaturan")}
        onProfile={() => setCurrentPage("ubahProfil")}
      />
    );
  }

  if (currentPage === "pengaturan") {
    return (
      <PengaturanPage
        onBackToDashboard={() => setCurrentPage("dashboard")}
        onDataLaporan={() => setCurrentPage("laporan")}
        onDataWarga={() => setCurrentPage("warga")}
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  return (
    <DashboardPage
      onDataLaporan={() => setCurrentPage("laporan")}
      onOpenDetail={() => {
        setLaporanId(1);
        setCurrentPage("detail");
      }}
      onDataWarga={() => setCurrentPage("warga")}
      onPengaturan={() => setCurrentPage("pengaturan")}
      onProfile={() => setCurrentPage("ubahProfil")}
    />
  );
}
