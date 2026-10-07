"use client";

import { useState } from "react";

type StatusLaporan =
  | "Dikirim"
  | "Diproses"
  | "Selesai"
  | "Ditolak";

export default function DetailLaporanPage({
  onBackToLaporan,
  onBackToDashboard,
  onPengaturan,
  onProfile,
}: {
  onBackToLaporan: () => void;
  onBackToDashboard: () => void;
  onPengaturan: () => void;
  onProfile: () => void;
}) {
  const [status, setStatus] =
    useState<StatusLaporan>("Diproses");

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 z-20 h-screen w-[244px] border-r border-[#D9DEE5] bg-[#F8FAFC]">
        {/* LOGO */}
        <div className="flex h-[132px] items-center border-b border-[#D9DEE5] px-[34px]">
          <img
            src="/login-logo.png"
            alt="LaporDesa"
            className="w-[160px] object-contain"
          />
        </div>

        {/* MENU */}
        <nav className="mt-[36px] px-[25px]">
          {/* DASHBOARD */}
          <button
            type="button"
            onClick={onBackToDashboard}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <HomeIcon />
            <span>Dashboard</span>
          </button>

          {/* DATA LAPORAN */}
          <button
            type="button"
            onClick={onBackToLaporan}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] bg-[#B9E4D8] px-4 text-left text-[16px] font-semibold text-[#14294A]"
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          {/* DATA WARGA */}
          <button
            type="button"
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <PeopleIcon />
            <span>Data Warga</span>
          </button>

          {/* PENGATURAN */}
          <button
            type="button"
            onClick={onPengaturan}
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#D9DEE5] p-[25px]">
          <button
            type="button"
            className="flex h-[48px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[15px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <LogoutIcon />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <section className="ml-[244px] min-h-screen">
        {/* HEADER */}
        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">
          <div className="w-[493px]">
            <input
              type="text"
              placeholder="Cari laporan, warga, atau kata kunci..."
              autoComplete="off"
              className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00B686]"
            />
          </div>

          <div className="flex items-center gap-[20px]">
            {/* NOTIFICATION */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setNotificationOpen(
                    (prev) => !prev
                  )
                }
                className="text-[#14294A]"
              >
                <BellIcon />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-[42px] z-[9999] w-[300px] rounded-[10px] border border-[#D9DEE5] bg-white p-[16px] shadow-lg">
                  <div className="mb-[12px] flex items-center justify-between">
                    <h3 className="text-[14px] font-bold text-[#14294A]">
                      Notifikasi
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        setNotificationOpen(false)
                      }
                      className="text-[18px] text-[#64748B]"
                    >
                      ×
                    </button>
                  </div>

                  <div className="border-b border-[#E1E7ED] pb-[12px]">
                    <p className="text-[12px] font-semibold text-[#14294A]">
                      Laporan baru diterima
                    </p>

                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Laporan &quot;Jalan Rusak&quot; telah masuk.
                    </p>
                  </div>

                  <div className="pt-[12px]">
                    <p className="text-[12px] font-semibold text-[#14294A]">
                      Status laporan diperbarui
                    </p>

                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Laporan sedang dalam proses.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE */}
            <button
              type="button"
              onClick={onProfile}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#14294A] bg-white text-[#14294A]"
            >
              <UserIcon />
            </button>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <div className="px-[34px] pb-[35px] pt-[36px]">
          {/* TITLE */}
          <div className="mb-[24px] flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToLaporan}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-[#14294A] hover:bg-[#EAF5F2]"
            >
              <ArrowLeftIcon />
            </button>

            <h1 className="text-[25px] font-bold">
              Detail Laporan
            </h1>
          </div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-[18px]">
            {/* ================= LEFT ================= */}
            <div className="space-y-[12px]">
              {/* DETAIL LAPORAN */}
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[22px]">
                <div className="flex items-start gap-[13px]">
                  {/* ICON */}
                  <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center">
                    <ReportIcon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-[20px] font-bold">
                      Jalan Rusak
                    </h2>

                    <p className="mt-[3px] text-[12px] font-medium text-[#00A97B]">
                      Infrastruktur
                    </p>
                  </div>
                </div>

                {/* INFO */}
                <div className="mt-[18px] grid grid-cols-3 gap-[20px] border-t border-[#E2E8F0] pt-[15px]">
                  <div>
                    <p className="text-[11px] text-[#64748B]">
                      Pelapor
                    </p>

                    <div className="mt-[4px] flex items-center gap-[5px]">
                      <UserSmallIcon />

                      <p className="text-[12px] font-semibold">
                        Budi Santoso
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] text-[#64748B]">
                      Lokasi
                    </p>

                    <p className="mt-[4px] text-[12px] font-semibold">
                      Jl. Melati, RT 01/RW 01
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-[#64748B]">
                      Tanggal
                    </p>

                    <p className="mt-[4px] text-[12px] font-semibold">
                      17 Sep 2026
                    </p>
                  </div>
                </div>
              </section>

              {/* DESKRIPSI */}
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[18px]">
                <h3 className="mb-[10px] text-[13px] font-bold">
                  Deskripsi Laporan
                </h3>

                <p className="max-w-[680px] text-[13px] leading-[1.6] text-[#475569]">
                  Jalan di depan rumah mengalami kerusakan
                  dan terdapat beberapa lubang yang dapat
                  membahayakan pengguna jalan terutama saat
                  hujan karena lubang tertutup air.
                </p>
              </section>

              {/* BUKTI FOTO */}
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[18px]">
                <h3 className="mb-[12px] text-[13px] font-bold">
                  Bukti Foto
                </h3>

                <div className="flex h-[150px] gap-[8px]">
                  {/* FOTO 1 */}
                  <div className="h-[150px] w-[220px] overflow-hidden rounded-[9px] bg-[#E2E8F0]">
                    <img
                      src="/laporan-jalan-rusak-1.png"
                      alt="Bukti laporan jalan rusak"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="flex h-full items-center justify-center text-[12px] text-[#64748B]">
                      Foto laporan
                    </div>
                  </div>

                  {/* FOTO 2 */}
                  <div className="h-[150px] w-[145px] overflow-hidden rounded-[9px] bg-[#E2E8F0]">
                    <img
                      src="/laporan-jalan-rusak-2.png"
                      alt="Bukti laporan jalan rusak"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div className="flex h-full items-center justify-center text-[12px] text-[#64748B]">
                      Foto laporan
                    </div>
                  </div>

                  {/* FOTO LAINNYA */}
                  <button
                    type="button"
                    className="flex h-[150px] w-[145px] flex-col items-center justify-center rounded-[9px] border border-[#8ED2BD] bg-[#EAF7F3] text-[#087F60]"
                  >
                    <CameraIcon />

                    <span className="mt-[7px] text-[12px] font-bold">
                      +2
                    </span>

                    <span className="text-[11px]">
                      foto lainnya
                    </span>
                  </button>
                </div>
              </section>
            </div>

            {/* ================= RIGHT ================= */}
            <div>
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[18px]">
                {/* STATUS */}
                <h3 className="text-[14px] font-bold">
                  Status Laporan
                </h3>

                {/* DROPDOWN HIJAU */}
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as StatusLaporan
                    )
                  }
                  className="mt-[14px] h-[40px] w-full rounded-[8px] border border-[#8ED2BD] bg-[#B9E4D8] px-[14px] text-[12px] font-semibold text-[#087F60] outline-none focus:border-[#00A97B]"
                >
                  <option value="Dikirim">
                    Dikirim
                  </option>

                  <option value="Diproses">
                    Diproses
                  </option>

                  <option value="Selesai">
                    Selesai
                  </option>

                  <option value="Ditolak">
                    Ditolak
                  </option>
                </select>

                {/* TIMELINE */}
                <div className="relative mt-[25px] pl-[12px]">
                  {/* GARIS */}
                  <div className="absolute left-[16px] top-[8px] bottom-[8px] w-[1px] bg-[#B9E4D8]" />

                  <TimelineItem
                    title="Dikirim"
                    date="17 September 2026"
                  />

                  <TimelineItem
                    title="Diproses"
                    date="19 September 2026"
                  />

                  <TimelineItem
                    title="Selesai"
                    date=""
                  />

                  <TimelineItem
                    title="Ditolak"
                    date=""
                    last
                  />
                </div>

                {/* MAP */}
                <div className="mt-[25px]">
                  <h3 className="mb-[9px] text-[13px] font-bold">
                    Lihat lokasi di peta
                  </h3>

                  <div className="h-[145px] w-full overflow-hidden rounded-[9px] border border-[#C9D0D8] bg-[#E2E8F0]">
                    <iframe
                      title="Lokasi laporan"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=106.811666%2C-6.205%2C106.821666%2C-6.195&layer=mapnik&marker=-6.2%2C106.816666"
                      className="h-full w-full border-0"
                      loading="lazy"
                    />
                  </div>

                  <p className="mt-[8px] text-[11px] text-[#64748B]">
                    Jl. Melati, RT 01/RW 01
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =====================================================
   TIMELINE
===================================================== */

function TimelineItem({
  title,
  date,
  last = false,
}: {
  title: string;
  date: string;
  last?: boolean;
}) {
  return (
    <div
      className={`relative flex gap-[12px] ${
        last ? "" : "mb-[20px]"
      }`}
    >
      {/* DOT */}
      <div className="relative z-10 mt-[2px] h-[10px] w-[10px] shrink-0 rounded-full bg-[#0A9F6E]" />

      {/* TEXT */}
      <div className="-mt-[2px]">
        <p className="text-[11px] font-semibold text-[#14294A]">
          {title}
        </p>

        {date && (
          <p className="mt-[2px] text-[8px] text-[#94A3B8]">
            {date}
          </p>
        )}
      </div>
    </div>
  );
}

/* =====================================================
   ICONS
===================================================== */

function HomeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-7h6v7" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
      />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c.5-3.3 2.7-5 6-5s5.5 1.7 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 15c2.7.2 4.5 1.8 5 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.6 1Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 4v16" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
    </svg>
  );
}

function UserSmallIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M5 21c.5-4 3-6 7-6s6.5 2 7 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg
      width="39"
      height="43"
      viewBox="0 0 39 43"
      fill="none"
      stroke="#14294A"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 2h17l8 8v31H7z" />
      <path d="M24 2v8h8" />
      <path d="M13 18h13" />
      <path d="M13 24h13" />
      <path d="M13 30h9" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}