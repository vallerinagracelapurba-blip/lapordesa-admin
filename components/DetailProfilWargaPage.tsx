"use client";

import { useState } from "react";

function BellIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20c.5-3.5 2.3-5.5 5.5-5.5s5 2 5.5 5.5" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M16 14.5c2.5.3 4 2 4.5 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.7-1.7.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 9.2l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.4h-.2a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M10 4H5v16h5" />
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
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
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 3h3l1.5 4-2 1.5a15 15 0 0 0 6 6L17 12l4 1.5v3c0 1.1-.9 2-2 2C10.7 18.5 5.5 13.3 5.5 5c0-1.1.9-2 1.5-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
    </svg>
  );
}

export default function DetailProfilWargaPage({
  onBackToWarga,
  onBackToDashboard,
  onPengaturan,
  onProfile,
}: {
  onBackToWarga: () => void;
  onBackToDashboard: () => void;
  onPengaturan: () => void;
  onProfile?: () => void;
}) {
  const [notificationOpen, setNotificationOpen] =
    useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 z-20 h-screen w-[244px] border-r border-[#D9DEE5] bg-[#F8FAFC]">
        <div className="flex h-[110px] items-center justify-center">
          <img
            src="/login-logo.png"
            alt="LaporDesa"
            className="w-[190px] object-contain"
          />
        </div>

        <nav className="mt-[36px] px-[25px]">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <HomeIcon />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          <button
            type="button"
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] bg-[#B9E4D8] px-4 text-left text-[16px] font-semibold"
          >
            <PeopleIcon />
            <span>Data Warga</span>
          </button>

          <button
            type="button"
            onClick={onPengaturan}
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
        </nav>

        <div className="absolute bottom-[25px] left-[25px] right-[25px]">
          <button
            type="button"
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <section className="ml-[244px] min-h-screen">
        {/* HEADER */}
        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">
          <div className="w-[430px]">
            <input
              type="text"
              placeholder="Cari laporan, warga, atau kata kunci..."
              className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00A97B]"
            />
          </div>

          <div className="relative flex items-center gap-[20px]">
            {/* NOTIFICATION */}
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
              <div className="absolute right-[60px] top-[50px] z-50 w-[300px] rounded-[10px] border border-[#D9DEE5] bg-white p-[14px] shadow-lg">
                <div className="mb-[10px] flex items-center justify-between">
                  <p className="text-[13px] font-bold">
                    Notifikasi
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setNotificationOpen(false)
                    }
                    className="text-[18px] leading-none text-[#94A3B8]"
                  >
                    ×
                  </button>
                </div>

                <div className="rounded-[8px] bg-[#EAF7F3] p-[10px]">
                  <p className="text-[11px] font-semibold text-[#087F60]">
                    Data warga diperbarui
                  </p>

                  <p className="mt-1 text-[10px] text-[#64748B]">
                    Profil Budi Santoso baru saja diperbarui.
                  </p>
                </div>

                <div className="mt-[8px] rounded-[8px] bg-[#F8FAFC] p-[10px]">
                  <p className="text-[11px] font-semibold">
                    Laporan baru masuk
                  </p>

                  <p className="mt-1 text-[10px] text-[#64748B]">
                    Terdapat laporan warga yang perlu diproses.
                  </p>
                </div>
              </div>
            )}

            {/* PROFILE */}
            <button
              type="button"
              onClick={onProfile}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#14294A] bg-white"
            >
              <UserIcon />
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="px-[34px] pb-[40px] pt-[30px]">
          {/* TITLE */}
          <div className="mb-[22px] flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToWarga}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
            >
              <ArrowLeftIcon />
            </button>

            <div>
              <h1 className="text-[25px] font-bold leading-none">
                Detail Profil Warga
              </h1>

              <p className="mt-2 text-[13px] text-[#64748B]">
                Informasi lengkap mengenai data kependudukan warga
              </p>
            </div>
          </div>

          {/* PROFILE HEADER */}
          <section className="rounded-[10px] border border-[#C9D0D8] bg-white px-[24px] py-[20px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[18px]">
                <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#DDF1EB] text-[#087F60]">
                  <UserIcon />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-[21px] font-bold">
                      Budi Santoso
                    </h2>

                    <span className="rounded-full bg-[#B9E4D8] px-[11px] py-[4px] text-[11px] font-bold text-[#087F60]">
                      Aktif
                    </span>
                  </div>

                  <p className="mt-1 text-[13px] text-[#64748B]">
                    Warga RT 01 / RW 01
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[12px] text-[#64748B]">
                  Terdaftar sebagai penduduk
                </p>
                <p className="mt-1 text-[14px] font-semibold">
                  12 Juni 2015
                </p>
              </div>
            </div>
          </section>

          {/* MAIN GRID */}
          <div className="mt-[15px] grid grid-cols-[1fr_300px] gap-[15px]">
            {/* INFORMASI PRIBADI */}
            <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[22px]">
              <div className="mb-[20px]">
                <h2 className="text-[17px] font-bold">
                  Informasi Pribadi
                </h2>

                <p className="mt-1 text-[12px] text-[#64748B]">
                  Data identitas dan informasi dasar warga
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-[35px] gap-y-[18px]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                    Nama Lengkap
                  </p>
                  <p className="mt-1 text-[14px] font-semibold">
                    Budi Santoso
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                    Tempat, Tanggal Lahir
                  </p>
                  <p className="mt-1 text-[14px] font-semibold">
                    Lampung, 1 Agustus 2000
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                    Jenis Kelamin
                  </p>
                  <p className="mt-1 text-[14px] font-semibold">
                    Laki-laki
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                    Agama
                  </p>
                  <p className="mt-1 text-[14px] font-semibold">
                    Islam
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon />
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Pekerjaan
                    </p>
                  </div>

                  <p className="mt-1 text-[14px] font-semibold">
                    Wiraswasta
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon />
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      No. HP
                    </p>
                  </div>

                  <p className="mt-1 text-[14px] font-semibold">
                    0812356654
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <MailIcon />
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Email
                    </p>
                  </div>

                  <p className="mt-1 text-[14px] font-semibold">
                    budissaan@gmail.com
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon />
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Alamat
                    </p>
                  </div>

                  <p className="mt-1 text-[14px] font-semibold">
                    Jl. Melati, RT 01/RW 01
                  </p>
                </div>
              </div>
            </section>

            {/* RIGHT COLUMN */}
            <div className="space-y-[15px]">
              {/* STATUS */}
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[20px]">
                <p className="text-[12px] font-semibold text-[#64748B]">
                  STATUS KEPENDUDUKAN
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#B9E4D8] px-[13px] py-[6px] text-[12px] font-bold text-[#087F60]">
                    Aktif
                  </span>

                  <span className="text-[11px] text-[#94A3B8]">
                    Terverifikasi
                  </span>
                </div>

                <div className="mt-4 h-[1px] bg-[#E2E8F0]" />

                <p className="mt-4 text-[12px] leading-[19px] text-[#64748B]">
                  Warga tercatat sebagai penduduk aktif
                  di wilayah RT 01 / RW 01.
                </p>
              </section>

              {/* RIWAYAT */}
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[20px]">
                <div className="flex items-center gap-2">
                  <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[8px] bg-[#E5F4EF] text-[#087F60]">
                    <CalendarIcon />
                  </div>

                  <div>
                    <h2 className="text-[15px] font-bold">
                      Riwayat Data
                    </h2>

                    <p className="text-[11px] text-[#94A3B8]">
                      Pembaruan terakhir
                    </p>
                  </div>
                </div>

                <div className="mt-[18px] rounded-[8px] bg-[#F8FAFC] px-[13px] py-[12px]">
                  <p className="text-[11px] text-[#94A3B8]">
                    Terakhir diperbarui
                  </p>

                  <p className="mt-1 text-[13px] font-bold">
                    05 September 2025
                  </p>

                  <p className="mt-3 text-[11px] text-[#94A3B8]">
                    Oleh
                  </p>

                  <p className="mt-1 text-[13px] font-semibold">
                    Pengelola RT 01
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* FOOTER NOTE */}
          <div className="mt-[15px] rounded-[10px] border border-dashed border-[#B8C2CC] bg-[#F8FAFC] px-[18px] py-[12px]">
            <p className="text-[11px] text-[#64748B]">
              Data warga digunakan untuk kebutuhan administrasi
              dan pengelolaan penduduk di wilayah RT 01 / RW 01.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}