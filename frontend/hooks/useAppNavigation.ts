"use client";
import { useRouter } from "next/navigation";
import { selectLaporan } from "@/lib/selectedLaporan";
import { logout } from "@/services/auth";
export function useAppNavigation() {
  const router = useRouter();
  return {
    onBackToDashboard: () => router.push("/dashboard"),
    onDataLaporan: () => router.push("/laporan"),
    onBackToLaporan: () => router.push("/laporan"),
    onDataWarga: () => router.push("/warga"),
    onBackToWarga: () => router.push("/warga"),
    onPengaturan: () => router.push("/pengaturan"),
    onBackToPengaturan: () => router.push("/pengaturan"),
    onProfile: () => router.push("/pengaturan/profil"),
    onOpenDetail: (id: string | number) => {
      selectLaporan(id);
      router.push("/laporan/detail");
    },
    onTambahWarga: () => window.alert("Fitur tambah warga belum tersedia."),
    onLogout: async () => {
      try { await logout(); router.replace("/login"); router.refresh(); }
      catch { window.alert("Gagal keluar. Silakan coba lagi."); }
    },
  };
}
