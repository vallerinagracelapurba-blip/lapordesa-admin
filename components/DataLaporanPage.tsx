"use client";

import { useState } from "react";

type Laporan = {
  judul: string;
  kategori: string;
  lokasi: string;
  pelapor: string;
  hp: string;
  tanggal: string;
  jam: string;
  status: "Diproses" | "Selesai";
};

const dataLaporan: Laporan[] = [
  {
    judul: "Jalan Rusak",
    kategori: "Infrastruktur",
    lokasi: "Jl. Anggrek, RT 01/RW 01",
    pelapor: "Budi Santoso",
    hp: "0824677876543",
    tanggal: "17 Sep 2026",
    jam: "10:40",
    status: "Diproses",
  },
  {
    judul: "Lampu Jalan Mati",
    kategori: "Infrastruktur",
    lokasi: "Jl. Melati, RT 01/RW 01",
    pelapor: "Jake",
    hp: "0345678776544",
    tanggal: "10 Sep 2026",
    jam: "08:40",
    status: "Diproses",
  },
  {
    judul: "Jalan Rusak",
    kategori: "Infrastruktur",
    lokasi: "Jl. Anggrek, RT 01/RW 01",
    pelapor: "Karina",
    hp: "08654321567654",
    tanggal: "9 Sep 2026",
    jam: "11:47",
    status: "Diproses",
  },
  {
    judul: "Saluran Air Tersumbat",
    kategori: "Kebersihan",
    lokasi: "Jl. Mekar, RT 02/RW 01",
    pelapor: "Devano",
    hp: "6789432654354",
    tanggal: "6 Sep 2026",
    jam: "20:40",
    status: "Selesai",
  },
  {
    judul: "Sampah Menumpuk",
    kategori: "Kebersihan",
    lokasi: "Jl. Melati, RT 01/RW 01",
    pelapor: "David R.",
    hp: "4567890543254",
    tanggal: "1 Sep 2026",
    jam: "10:38",
    status: "Selesai",
  },
];

export default function DataLaporanPage({
  onBackToDashboard,
  onOpenDetail,
  onDataWarga,
  onPengaturan,
  onProfile,
}: {
  onBackToDashboard: () => void;
  onOpenDetail: () => void;
  onDataWarga: () => void;
  onPengaturan: () => void;
  onProfile: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [tanggalFilter, setTanggalFilter] = useState("Terbaru");
  const [notificationOpen, setNotificationOpen] = useState(false);

  const filteredData = [...dataLaporan]
    .filter((laporan) => {
      const query = searchQuery.toLowerCase().trim();

      const cocokSearch =
        query === "" ||
        laporan.judul.toLowerCase().includes(query) ||
        laporan.kategori.toLowerCase().includes(query) ||
        laporan.lokasi.toLowerCase().includes(query) ||
        laporan.pelapor.toLowerCase().includes(query) ||
        laporan.hp.toLowerCase().includes(query);

      const cocokStatus =
        statusFilter === "Semua Status" || laporan.status === statusFilter;

      return cocokSearch && cocokStatus;
    })
    .sort((a, b) => {
      if (tanggalFilter === "Terbaru") return 0;
      return 0;
    });

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      {/* SIDEBAR */}
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
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <HomeIcon />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] bg-[#B9E4D8] px-4 text-left text-[16px] font-semibold text-[#14294A]"
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          {/* DATA WARGA */}
          <button
            type="button"
            onClick={onDataWarga}
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

      {/* MAIN */}
      <section className="ml-[244px] min-h-screen">
        {/* HEADER */}
        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">
          <div className="w-[493px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  setNotificationOpen((prev) => !prev)
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
                      onClick={() => setNotificationOpen(false)}
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
                      Laporan diperbarui
                    </p>

                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Status &quot;Sampah Menumpuk&quot; sedang diproses.
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

        {/* CONTENT */}
        <div className="px-[34px] pb-[35px] pt-[36px]">
          <div className="mb-[24px] flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToDashboard}
              aria-label="Kembali ke Dashboard"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-[#14294A] hover:bg-[#EAF5F2] hover:text-[#00A97B]"
            >
              <ArrowLeftIcon />
            </button>

            <div>
              <h1 className="text-[25px] font-bold leading-tight text-[#14294A]">
                Data Laporan
              </h1>
              <p className="mt-[3px] text-[14px] text-[#14294A]">
                Kelola dan pantau seluruh laporan warga.
              </p>
            </div>
          </div>

          {/* FILTER */}
          <div className="mb-[12px] flex items-center justify-between">
            <p className="text-[14px] text-[#64748B]">
              Menampilkan {filteredData.length} laporan
            </p>

            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[38px] rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[12px] text-[#475569] outline-none focus:border-[#00B686]"
              >
                <option>Semua Status</option>
                <option>Diproses</option>
                <option>Selesai</option>
              </select>

              <select
                value={tanggalFilter}
                onChange={(e) => setTanggalFilter(e.target.value)}
                className="h-[38px] rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[12px] text-[#475569] outline-none focus:border-[#00B686]"
              >
                <option>Terbaru</option>
                <option>Terlama</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-[10px] border border-[#C9D0D8] bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#D9DEE5] bg-[#F8FAFC]">
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    LAPORAN
                  </th>
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    KATEGORI
                  </th>
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    LOKASI
                  </th>
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    PELAPOR
                  </th>
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    TANGGAL
                  </th>
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    STATUS
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((laporan, index) => (
                    <tr
                      key={`${laporan.judul}-${laporan.pelapor}-${index}`}
                      onClick={onOpenDetail}
                      className="cursor-pointer border-b border-[#D9DEE5] last:border-b-0 hover:bg-[#FAFCFB]"
                    >
                      <td className="px-[14px] py-[14px]">
                        <p className="text-[13px] font-bold text-[#14294A]">
                          {laporan.judul}
                        </p>
                        <p className="mt-1 text-[9px] text-[#64748B]">
                          {laporan.jam}
                        </p>
                      </td>

                      <td className="px-[14px] py-[14px] text-[11px] text-[#475569]">
                        {laporan.kategori}
                      </td>

                      <td className="px-[14px] py-[14px] text-[11px] text-[#475569]">
                        {laporan.lokasi}
                      </td>

                      <td className="px-[14px] py-[14px]">
                        <p className="text-[11px] font-semibold text-[#14294A]">
                          {laporan.pelapor}
                        </p>
                        <p className="mt-1 text-[9px] text-[#64748B]">
                          {laporan.hp}
                        </p>
                      </td>

                      <td className="px-[14px] py-[14px] text-[11px] text-[#475569]">
                        {laporan.tanggal}
                      </td>

                      <td className="px-[14px] py-[14px]">
                        <span className="rounded-full bg-[#B9E4D8] px-[16px] py-[5px] text-[9px] font-medium text-[#087F60]">
                          {laporan.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-[12px] text-[#94A3B8]"
                    >
                      Tidak ada laporan yang sesuai.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c.7-3.3 3-5 7-5s6.3 1.7 7 5" />
    </svg>
  );
}

function SettingsIcon() {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.1H15v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z"
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