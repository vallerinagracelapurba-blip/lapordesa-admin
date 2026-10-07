"use client";

import { useState } from "react";

/* =====================================================
   PROPS
===================================================== */

export default function UbahProfilPage({
  onBackToPengaturan,
  onBackToDashboard,
  onDataLaporan,
  onDataWarga,
  onProfile,
}: {
  onBackToPengaturan: () => void;
  onBackToDashboard: () => void;
  onDataLaporan?: () => void;
  onDataWarga?: () => void;
  onProfile?: () => void;
}) {
  const [nama, setNama] = useState("Joko Sucipto");
  const [email, setEmail] = useState("joko@gmail.com");
  const [jabatan, setJabatan] = useState("Ketua RT 01");
  const [hp, setHp] = useState("08123456");
  const [alamat, setAlamat] = useState(
    "Jl. Melati, RT 01, RW 01\nSukoharjo 1\nKecamatan Sukoharjo\nKabupaten Pringsewu\nLampung"
  );

  const [saved, setSaved] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="fixed left-0 top-0 z-20 h-screen w-[244px] border-r border-[#D9DEE5] bg-[#F8FAFC]">
        {/* LOGO */}

        <div className="flex h-[110px] items-center justify-center">
          <img
            src="/login-logo.png"
            alt="LaporDesa"
            className="w-[190px] object-contain"
          />
        </div>

        {/* MENU */}

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
            onClick={onDataLaporan}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          <button
            type="button"
            onClick={onDataWarga}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <PeopleIcon />
            <span>Data Warga</span>
          </button>

          <button
            type="button"
            onClick={onBackToPengaturan}
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] bg-[#B9E4D8] px-4 text-left text-[16px] font-semibold"
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
        </nav>

        {/* LOGOUT */}

        <div className="absolute bottom-0 left-0 w-full border-t border-[#D9DEE5] p-[25px]">
          <button
            type="button"
            onClick={onBackToPengaturan}
            className="flex h-[48px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[15px] font-semibold hover:bg-[#EAF5F2]"
          >
            <LogoutIcon />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <section className="ml-[244px] min-h-screen">
        {/* HEADER */}

        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">
          <div className="w-[493px]">
            <input
              type="text"
              placeholder="Cari laporan, warga, atau kata kunci..."
              className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00B686]"
            />
          </div>

          <div className="flex items-center gap-[20px]">
            {/* NOTIFICATION */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setNotificationOpen(!notificationOpen)
                }
                className="text-[#14294A] hover:text-[#00A97B]"
              >
                <BellIcon />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-[38px] z-50 w-[300px] rounded-[10px] border border-[#D9DEE5] bg-white p-3 shadow-lg">
                  <p className="text-[13px] font-bold text-[#14294A]">
                    Notifikasi
                  </p>

                  <div className="mt-3 space-y-2">
                    <div className="rounded-[8px] bg-[#F8FAFC] p-3">
                      <p className="text-[11px] font-semibold text-[#14294A]">
                        Laporan baru masuk
                      </p>

                      <p className="mt-1 text-[10px] text-[#64748B]">
                        Laporan Jalan Rusak dari Budi Santoso.
                      </p>
                    </div>

                    <div className="rounded-[8px] bg-[#F8FAFC] p-3">
                      <p className="text-[11px] font-semibold text-[#14294A]">
                        Laporan diperbarui
                      </p>

                      <p className="mt-1 text-[10px] text-[#64748B]">
                        Status laporan berubah menjadi Diproses.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

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

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="px-[34px] pb-[40px] pt-[32px]">
          {/* TITLE */}

          <div className="mb-[24px] flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToPengaturan}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
            >
              <ArrowLeftIcon />
            </button>

            <h1 className="text-[25px] font-bold">
              Ubah Profil
            </h1>
          </div>

          {/* =================================================
              PROFILE AREA
          ================================================= */}

          <div className="grid grid-cols-[225px_1fr] gap-[12px]">
            {/* PROFILE CARD */}

            <section className="rounded-[9px] border border-[#C9D0D8] bg-white p-[16px]">
              <div className="flex flex-col items-center">
                <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border border-[#14294A] bg-[#F8FAFC]">
                  <UserIconLarge />
                </div>

                <button
                  type="button"
                  className="mt-[10px] flex h-[37px] items-center gap-2 rounded-[6px] border border-[#AEB6C0] bg-white px-[12px] text-[12px] font-medium hover:bg-[#EAF5F2]"
                >
                  <ImageIcon />
                  Ubah foto profil
                </button>
              </div>

              <div className="mt-[15px] space-y-[10px]">
                <ProfileInfo
                  icon={<UserSmallIcon />}
                  title="Nama"
                  value={nama}
                />

                <ProfileInfo
                  icon={<MailIcon />}
                  title="Email"
                  value={email}
                />

                <ProfileInfo
                  icon={<DocumentSmallIcon />}
                  title="Jabatan"
                  value={jabatan}
                />

                <ProfileInfo
                  icon={<PhoneIcon />}
                  title="No. HP"
                  value={hp}
                />

                <ProfileInfo
                  icon={<MapPinIcon />}
                  title="Alamat"
                  value="Jl. Melati, RT 01, RW 01"
                />
              </div>
            </section>

            {/* FORM CARD */}

            <section className="rounded-[9px] border border-[#C9D0D8] bg-white">
              {/* CARD HEADER */}

              <div className="flex h-[54px] items-center gap-2 border-b border-[#C9D0D8] px-[16px]">
                <UserSmallIcon />

                <h2 className="text-[18px] font-bold">
                  Informasi Akun
                </h2>
              </div>

              {/* FORM */}

              <div className="p-[18px]">
                <h3 className="mb-[15px] text-[14px] font-bold">
                  Data Diri
                </h3>

                <div className="grid grid-cols-2 gap-x-[28px] gap-y-[15px]">
                  {/* NAMA */}

                  <div>
                    <label className="mb-[6px] block text-[13px] font-medium">
                      Nama lengkap
                    </label>

                    <input
                      value={nama}
                      onChange={(e) =>
                        setNama(e.target.value)
                      }
                      className="h-[38px] w-full rounded-[6px] border border-[#BFC7D0] bg-white px-[10px] text-[12px] outline-none focus:border-[#00A97B]"
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className="mb-[6px] block text-[13px] font-medium">
                      Email
                    </label>

                    <input
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="h-[38px] w-full rounded-[6px] border border-[#BFC7D0] bg-white px-[10px] text-[12px] outline-none focus:border-[#00A97B]"
                    />
                  </div>

                  {/* JABATAN */}

                  <div>
                    <label className="mb-[6px] block text-[13px] font-medium">
                      Jabatan
                    </label>

                    <select
                      value={jabatan}
                      onChange={(e) =>
                        setJabatan(e.target.value)
                      }
                      className="h-[38px] w-full rounded-[6px] border border-[#BFC7D0] bg-white px-[10px] text-[12px] outline-none focus:border-[#00A97B]"
                    >
                      <option>Ketua RT 01</option>
                      <option>Pengelola RT 01</option>
                      <option>Wakil Ketua RT 01</option>
                    </select>
                  </div>

                  {/* ALAMAT */}

                  <div className="row-span-2">
                    <label className="mb-[6px] block text-[13px] font-medium">
                      Alamat
                    </label>

                    <textarea
                      value={alamat}
                      onChange={(e) =>
                        setAlamat(e.target.value)
                      }
                      className="h-[105px] w-full resize-none rounded-[6px] border border-[#BFC7D0] bg-white px-[10px] py-[8px] text-[12px] leading-[18px] outline-none focus:border-[#00A97B]"
                    />
                  </div>

                  {/* HP */}

                  <div>
                    <label className="mb-[6px] block text-[13px] font-medium">
                      No. HP
                    </label>

                    <input
                      value={hp}
                      onChange={(e) =>
                        setHp(e.target.value)
                      }
                      className="h-[38px] w-full rounded-[6px] border border-[#BFC7D0] bg-white px-[10px] text-[12px] outline-none focus:border-[#00A97B]"
                    />
                  </div>
                </div>

                {/* BUTTON */}

                <div className="mt-[25px] flex justify-end gap-3 border-t border-[#E1E5EA] pt-[17px]">
                  <button
                    type="button"
                    onClick={onBackToPengaturan}
                    className="h-[40px] rounded-[7px] border border-[#BFC7D0] bg-white px-[18px] text-[12px] font-semibold hover:bg-[#F1F5F9]"
                  >
                    Batal
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSaved(true);

                      setTimeout(() => {
                        setSaved(false);
                      }, 2000);
                    }}
                    className="h-[40px] rounded-[7px] bg-[#8ED2BD] px-[20px] text-[12px] font-semibold text-[#087F60] hover:bg-[#7CC9B1]"
                  >
                    Simpan Perubahan
                  </button>
                </div>

                {saved && (
                  <div className="mt-3 rounded-[6px] bg-[#EAF5F2] px-3 py-2 text-[12px] font-medium text-[#087F60]">
                    Perubahan profil berhasil disimpan.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =====================================================
   PROFILE INFO
===================================================== */

function ProfileInfo({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-[8px]">
      <div className="mt-[2px]">{icon}</div>

      <div>
        <p className="text-[17px] font-bold leading-[18px]">
          {title}
        </p>

        <p className="text-[13px] leading-[17px] text-[#334155]">
          {value}
        </p>
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
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
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
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
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
      strokeWidth="1.8"
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
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1.9-1.5v-.2h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.6 1Z"
      />
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
      strokeWidth="1.8"
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
      width="29"
      height="29"
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
      width="24"
      height="24"
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

function UserIconLarge() {
  return (
    <svg
      width="58"
      height="58"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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
      width="22"
      height="22"
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

function MailIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DocumentSmallIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 3.5h3l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5l1.5-2 4 1.5v3c0 1-1 2-2 2C10 18 6 14 4 7.5c-.3-1.8.5-4 2.5-4Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="9" r="1.5" />
      <path d="m21 15-5-5L5 20" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="23"
      height="23"
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