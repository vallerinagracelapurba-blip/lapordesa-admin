"use client";

import { useState } from "react";

import LoginPage from "@/components/LoginPage";
import DashboardPage from "@/components/DashboardPage";
import DataLaporanPage from "@/components/DataLaporanPage";
import DetailLaporanPage from "@/components/DetailLaporanPage";
import DataWargaPage from "@/components/DataWargaPage";
import DetailProfilWargaPage from "@/components/DetailProfilWargaPage";
import PengaturanPage from "@/components/PengaturanPage";
import UbahProfilPage from "@/components/UbahProfilPage";

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
  const [currentPage, setCurrentPage] =
    useState<Page>("dashboard");

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

  /* =====================================================
     DETAIL LAPORAN
  ===================================================== */

  if (currentPage === "detail") {
    return (
      <DetailLaporanPage
        onBackToLaporan={() =>
          setCurrentPage("laporan")
        }
        onBackToDashboard={() =>
          setCurrentPage("dashboard")
        }
        onPengaturan={() =>
          setCurrentPage("pengaturan")
        }
        onProfile={() =>
          setCurrentPage("ubahProfil")
        }
      />
    );
  }

  /* =====================================================
     UBAH PROFIL
  ===================================================== */

  if (currentPage === "ubahProfil") {
    return (
      <UbahProfilPage
        onBackToPengaturan={() =>
          setCurrentPage("pengaturan")
        }
        onBackToDashboard={() =>
          setCurrentPage("dashboard")
        }
        onDataLaporan={() =>
          setCurrentPage("laporan")
        }
        onDataWarga={() =>
          setCurrentPage("warga")
        }
        onProfile={() =>
          setCurrentPage("ubahProfil")
        }
      />
    );
  }

  /* =====================================================
     DATA LAPORAN
  ===================================================== */

  if (currentPage === "laporan") {
    return (
      <DataLaporanPage
        onBackToDashboard={() =>
          setCurrentPage("dashboard")
        }
        onOpenDetail={() =>
          setCurrentPage("detail")
        }
        onDataWarga={() =>
          setCurrentPage("warga")
        }
        onPengaturan={() =>
          setCurrentPage("pengaturan")
        }
        onProfile={() =>
          setCurrentPage("ubahProfil")
        }
      />
    );
  }

  /* =====================================================
     DETAIL PROFIL WARGA
  ===================================================== */

  if (currentPage === "detailWarga") {
    return (
      <DetailProfilWargaPage
        onBackToWarga={() =>
          setCurrentPage("warga")
        }
        onBackToDashboard={() =>
          setCurrentPage("dashboard")
        }
        onPengaturan={() =>
          setCurrentPage("pengaturan")
        }
        onProfile={() =>
          setCurrentPage("ubahProfil")
        }
      />
    );
  }

  /* =====================================================
     DATA WARGA
  ===================================================== */

  if (currentPage === "warga") {
    return (
      <DataWargaPage
        onBackToDashboard={() =>
          setCurrentPage("dashboard")
        }
        onDataLaporan={() =>
          setCurrentPage("laporan")
        }
        onOpenDetail={() =>
          setCurrentPage("detailWarga")
        }
        onTambahWarga={() => {}}
        onPengaturan={() =>
          setCurrentPage("pengaturan")
        }
        onProfile={() =>
          setCurrentPage("ubahProfil")
        }
      />
    );
  }

  /* =====================================================
     PENGATURAN
  ===================================================== */

  if (currentPage === "pengaturan") {
    return (
      <PengaturanPage
        onBackToDashboard={() =>
          setCurrentPage("dashboard")
        }
        onDataLaporan={() =>
          setCurrentPage("laporan")
        }
        onDataWarga={() =>
          setCurrentPage("warga")
        }
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  /* =====================================================
     DASHBOARD
  ===================================================== */

  return (
    <DashboardPage
      onDataLaporan={() =>
        setCurrentPage("laporan")
      }
      onOpenDetail={() =>
        setCurrentPage("detail")
      }
      onDataWarga={() =>
        setCurrentPage("warga")
      }
      onPengaturan={() =>
        setCurrentPage("pengaturan")
      }
      onProfile={() =>
        setCurrentPage("ubahProfil")
      }
    />
  );
}