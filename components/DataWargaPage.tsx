"use client";

import { useState } from "react";

/* =====================================================
   TYPE
===================================================== */

type StatusWarga = "aktif" | "tidak aktif";

type Warga = {
  nama: string;
  hp: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  rt: string;
  status: StatusWarga;
};

/* =====================================================
   DATA
===================================================== */

const dataWarga: Warga[] = [
  {
    nama: "Budi",
    hp: "12345",
    jenisKelamin: "Laki-laki",
    rt: "01/01",
    status: "aktif",
  },
  {
    nama: "Jake",
    hp: "24567",
    jenisKelamin: "Laki-laki",
    rt: "01/01",
    status: "aktif",
  },
  {
    nama: "Rafael",
    hp: "76543",
    jenisKelamin: "Laki-laki",
    rt: "02/01",
    status: "aktif",
  },
  {
    nama: "Devano",
    hp: "76549",
    jenisKelamin: "Laki-laki",
    rt: "02/01",
    status: "tidak aktif",
  },
  {
    nama: "Karina",
    hp: "72456",
    jenisKelamin: "Perempuan",
    rt: "01/01",
    status: "aktif",
  },
];

/* =====================================================
   PAGE
===================================================== */

export default function DataWargaPage({
  onBackToDashboard,
  onDataLaporan,
  onOpenDetail,
  onPengaturan,
  onProfile,
  onTambahWarga,
}: {
  onBackToDashboard: () => void;
  onDataLaporan: () => void;
  onOpenDetail: () => void;
  onPengaturan: () => void;
  onProfile: () => void;
  onTambahWarga: () => void;
}) {
  const [statusFilter, setStatusFilter] =
    useState("Semua status");

  const [rtFilter, setRtFilter] =
    useState("Semua RT");

  const [statusOpen, setStatusOpen] =
    useState(false);

  const [rtOpen, setRtOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const filteredWarga = dataWarga.filter((warga) => {
    const query = searchQuery
      .toLowerCase()
      .trim();

    const cocokStatus =
      statusFilter === "Semua status" ||
      warga.status === statusFilter;

    const cocokRT =
      rtFilter === "Semua RT" ||
      warga.rt === rtFilter;

    const cocokSearch =
      !query ||
      warga.nama
        .toLowerCase()
        .includes(query) ||
      warga.hp
        .toLowerCase()
        .includes(query) ||
      warga.jenisKelamin
        .toLowerCase()
        .includes(query) ||
      warga.rt
        .toLowerCase()
        .includes(query);

    return (
      cocokStatus &&
      cocokRT &&
      cocokSearch
    );
  });

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
          {/* DASHBOARD */}
          <button
            type="button"
            onClick={onBackToDashboard}
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
            "
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          {/* DATA WARGA - ACTIVE */}
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

        {/* LOGOUT */}
        <div className="absolute bottom-[25px] left-[25px] right-[25px]">
          <button
            type="button"
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <LogoutIcon />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <section className="ml-[244px] min-h-screen">
        {/* HEADER */}
        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">
          {/* SEARCH */}
          <div className="w-[430px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Cari laporan, warga, atau kata kunci..."
              autoComplete="off"
              className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00A97B]"
            />
          </div>

          {/* HEADER RIGHT */}
          <div className="flex items-center gap-[20px]">
            {/* BELL */}
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
                      Data warga diperbarui
                    </p>

                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Terdapat pembaruan data warga terbaru.
                    </p>
                  </div>

                  <div className="pt-[12px]">
                    <p className="text-[12px] font-semibold text-[#14294A]">
                      Data warga baru
                    </p>

                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Warga baru telah ditambahkan ke sistem.
                    </p>
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

        <div className="px-[34px] pb-[35px] pt-[32px]">
          {/* TITLE + TAMBAH */}
          <div className="mb-[19px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onBackToDashboard}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
              >
                <ArrowLeftIcon />
              </button>

              <h1 className="text-[25px] font-bold">
                Data Warga
              </h1>
            </div>

            {/* TAMBAH WARGA */}
            <button
              type="button"
              onClick={onTambahWarga}
              className="h-[49px] rounded-[7px] border border-[#C9D0D8] bg-white px-[15px] text-[13px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
            >
              + Tambah Warga
            </button>
          </div>

          {/* =================================================
              TABLE CARD
          ================================================= */}

          <section className="overflow-visible rounded-[8px] border border-[#C9D0D8] bg-white">
            {/* FILTER */}
            <div className="flex h-[70px] items-center gap-[11px] px-[15px]">
              {/* STATUS */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setStatusOpen(
                      (prev) => !prev
                    )
                  }
                  className="flex h-[36px] w-[185px] items-center justify-between rounded-[6px] border border-[#C9D0D8] bg-white px-[9px] text-[13px] font-semibold text-[#14294A]"
                >
                  <span>
                    {statusFilter}
                  </span>

                  <ChevronDownIcon />
                </button>

                {statusOpen && (
                  <div className="absolute left-0 top-[42px] z-30 w-[185px] overflow-hidden rounded-[7px] border border-[#D9DEE5] bg-white shadow-sm">
                    {[
                      "Semua status",
                      "aktif",
                      "tidak aktif",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setStatusFilter(
                            option
                          );
                          setStatusOpen(
                            false
                          );
                        }}
                        className="block w-full px-3 py-2 text-left text-[13px] text-[#14294A] hover:bg-[#EAF5F2]"
                      >
                        {option ===
                        "Semua status"
                          ? "Semua status"
                          : option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RT */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setRtOpen(
                      (prev) => !prev
                    )
                  }
                  className="flex h-[36px] w-[185px] items-center justify-between rounded-[6px] border border-[#C9D0D8] bg-white px-[9px] text-[13px] font-semibold text-[#14294A]"
                >
                  <span>
                    {rtFilter}
                  </span>

                  <ChevronDownIcon />
                </button>

                {rtOpen && (
                  <div className="absolute left-0 top-[42px] z-30 w-[185px] overflow-hidden rounded-[7px] border border-[#D9DEE5] bg-white shadow-sm">
                    {[
                      "Semua RT",
                      "01/01",
                      "02/01",
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setRtFilter(
                            option
                          );
                          setRtOpen(false);
                        }}
                        className="block w-full px-3 py-2 text-left text-[13px] text-[#14294A] hover:bg-[#EAF5F2]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-[1.2fr_1fr_1.15fr_1fr_0.8fr_35px] items-center border-y border-[#C9D0D8] bg-[#E1E1E1] px-[15px] py-[16px] text-[14px] font-bold">
              <div className="pl-[32px]">
                Nama
              </div>

              <div>No. HP</div>

              <div>Jenis Kelamin</div>

              <div>RT/RW</div>

              <div>Status</div>

              <div></div>
            </div>

            {/* ROWS */}
            {filteredWarga.length > 0 ? (
              filteredWarga.map(
                (warga, index) => (
                  <div
                    key={`${warga.nama}-${index}`}
                    onClick={onOpenDetail}
                    className={`grid h-[54px] cursor-pointer grid-cols-[1.2fr_1fr_1.15fr_1fr_0.8fr_35px] items-center px-[15px] text-[14px] font-semibold ${
                      index !==
                      filteredWarga.length - 1
                        ? "border-b border-[#C9D0D8]"
                        : ""
                    }`}
                  >
                    {/* NAMA */}
                    <div className="flex items-center gap-[13px]">
                      <div className="h-[25px] w-[25px] rounded-[5px] bg-[#817D86]" />

                      <span>
                        {warga.nama}
                      </span>
                    </div>

                    {/* HP */}
                    <div>
                      {warga.hp}
                    </div>

                    {/* JENIS KELAMIN */}
                    <div>
                      {warga.jenisKelamin}
                    </div>

                    {/* RT */}
                    <div>
                      {warga.rt}
                    </div>

                    {/* STATUS */}
                    <div>
                      <StatusBadge
                        status={
                          warga.status
                        }
                      />
                    </div>

                    {/* ARROW */}
                    <div className="text-[20px]">
                      &gt;
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="flex h-[120px] items-center justify-center text-[13px] text-[#64748B]">
                Data warga tidak ditemukan.
              </div>
            )}

            {/* =================================================
                FOOTER TABLE
            ================================================= */}

            <div className="flex h-[50px] items-center justify-between px-[10px]">
              <p className="text-[12px] text-[#334155]">
                Menampilkan{" "}
                <span>
                  {filteredWarga.length > 0
                    ? "1-5"
                    : "0"}
                </span>{" "}
                dari 65 warga
              </p>

              <div className="flex items-center gap-[5px]">
                <button
                  type="button"
                  className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-[15px] text-[#7B8085]"
                >
                  ‹
                </button>

                <PageButton
                  active
                  value="1"
                />

                <PageButton value="2" />
                <PageButton value="3" />
                <PageButton value="4" />
                <PageButton value="5" />

                <button
                  type="button"
                  className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-[15px] text-[#7B8085]"
                >
                  ›
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

/* =====================================================
   STATUS
===================================================== */

function StatusBadge({
  status,
}: {
  status: StatusWarga;
}) {
  if (status === "aktif") {
    return (
      <span className="inline-flex h-[18px] min-w-[72px] items-center justify-center rounded-full border border-[#55B997] bg-[#8ED2BD] px-[9px] text-[10px] font-medium text-[#087F60]">
        aktif
      </span>
    );
  }

  return (
    <span className="inline-flex h-[18px] min-w-[72px] items-center justify-center rounded-full border border-[#E99098] bg-[#F4A6AD] px-[9px] text-[10px] font-medium text-[#A92E38]">
      tidak aktif
    </span>
  );
}

/* =====================================================
   PAGINATION
===================================================== */

function PageButton({
  value,
  active = false,
}: {
  value: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`flex h-[20px] min-w-[20px] items-center justify-center rounded-[5px] border text-[11px] ${
        active
          ? "border-[#55B997] bg-[#8ED2BD] text-[#087F60]"
          : "border-[#BFC4CA] bg-white text-[#64748B]"
      }`}
    >
      {value}
    </button>
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

      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1.9-1.5v-.2h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.6 1Z" />
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

function ChevronDownIcon() {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}