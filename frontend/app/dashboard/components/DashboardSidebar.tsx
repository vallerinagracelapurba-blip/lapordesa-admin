
"use client";

import {
  DocumentIcon,
  HomeIcon,
  PeopleIcon,
  SettingsIcon,
} from "./DashboardIcons";

type DashboardSidebarProps = {
  onDataLaporan: () => void;
  onDataWarga: () => void;
  onPengaturan: () => void;
};

export default function DashboardSidebar({
  onDataLaporan,
  onDataWarga,
  onPengaturan,
}: DashboardSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[244px] border-r border-[#D9DEE5] bg-[#F8FAFC]">
      <div className="flex h-[110px] items-center justify-center">
        <img
          src="/login-logo.png"
          alt="LaporDesa"
          className="w-[190px] object-contain"
        />
      </div>

      <nav className="mt-[36px] px-[25px]">
        {/* DASHBOARD */}
        <button
          type="button"
          className="
            mb-3
            flex h-[52px] w-full
            items-center gap-4
            rounded-[13px]
            bg-[#B9E4D8]
            px-4
            text-left
            text-[16px]
            font-semibold
            text-[#14294A]
          "
        >
          <HomeIcon />
          <span>Dashboard</span>
        </button>

        {/* DATA LAPORAN */}
        <button
          type="button"
          onClick={onDataLaporan}
          className="
            mb-3
            flex h-[52px] w-full
            items-center gap-4
            rounded-[13px]
            px-4
            text-left
            text-[16px]
            font-semibold
            text-[#14294A]
            hover:bg-[#EAF5F2]
          "
        >
          <DocumentIcon />
          <span>Data Laporan</span>
        </button>

        {/* DATA WARGA */}
        <button
          type="button"
          onClick={onDataWarga}
          className="
            mb-3
            flex h-[52px] w-full
            items-center gap-4
            rounded-[13px]
            px-4
            text-left
            text-[16px]
            font-semibold
            text-[#14294A]
            hover:bg-[#EAF5F2]
          "
        >
          <PeopleIcon />
          <span>Data Warga</span>
        </button>

        {/* PENGATURAN */}
        <button
          type="button"
          onClick={onPengaturan}
          className="
            flex h-[52px] w-full
            items-center gap-4
            rounded-[13px]
            px-4
            text-left
            text-[16px]
            font-semibold
            text-[#14294A]
            hover:bg-[#EAF5F2]
          "
        >
          <SettingsIcon />
          <span>Pengaturan</span>
        </button>
      </nav>

    </aside>
  );
}
