
"use client";

import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useDashboardHeader } from "@/components/layout/DashboardHeaderContext";
import { useMemo, useState } from "react";

/* =====================================================
   PAGE
===================================================== */

export default function UbahProfilPage() {
  const { onBackToPengaturan } = useAppNavigation();

  const [nama, setNama] = useState("Joko Sucipto");
  const [email, setEmail] = useState("joko@gmail.com");
  const [jabatan, setJabatan] = useState("Ketua RT 01");
  const [hp, setHp] = useState("08123456");
  const [alamat, setAlamat] = useState(
    "Jl. Melati, RT 01, RW 01\nSukoharjo 1\nKecamatan Sukoharjo\nKabupaten Pringsewu\nLampung"
  );

  const [saved, setSaved] = useState(false);

  const notificationContent = useMemo(
    () => (
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
    ),
    []
  );

  useDashboardHeader({
    searchPlaceholder: "Cari laporan, warga, atau kata kunci...",
    notificationContent,
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      <section className="min-h-screen">
        {/* CONTENT */}
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

          {/* PROFILE AREA */}
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
                      onChange={(e) => setNama(e.target.value)}
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
                      onChange={(e) => setEmail(e.target.value)}
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
                      onChange={(e) => setJabatan(e.target.value)}
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
                      onChange={(e) => setAlamat(e.target.value)}
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
                      onChange={(e) => setHp(e.target.value)}
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
