
"use client";

import {
  BellIcon,
  UserIcon,
  HomeIcon,
  DocumentIcon,
  PeopleIcon,
  SettingsIcon,
  ArrowLeftIcon,
} from "./components/DataLaporanIcons";

import { useCallback, useEffect, useMemo, useState } from "react";

type Laporan = {
  id: number | string;
  judul: string;
  kategori: string;
  lokasi: string;
  pelapor: string;
  hp: string;
  tanggal: string;
  jam: string;
  status: string;
};

const API_URL = "http://localhost:5000/api/laporan";

function normalisasiTanggal(value: unknown): string {
  if (!value) return "";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function normalisasiLaporan(
  item: Record<string, unknown>,
  index: number
): Laporan {
  const tanggalRaw =
    item.tanggal_laporan ?? item.tanggal ?? item.created_at ?? "";

  const tanggal = normalisasiTanggal(tanggalRaw);
  const jamRaw = item.jam ?? item.waktu ?? "";

  return {
    id: (item.id ?? item.id_laporan ?? index + 1) as number | string,

    judul: String(
      item.judul ??
        item.nama_laporan ??
        item.jenis_laporan ??
        item.judul_laporan ??
        "-"
    ),

    kategori: String(
      item.nama_kategori ??
        item.kategori ??
        item.kategori_laporan ??
        "-"
    ),

    lokasi: String(
      item.alamat_lokasi ??
        item.lokasi ??
        item.alamat ??
        "-"
    ),

    pelapor: String(
      item.nama_pengirim ??
        item.nama_pelapor ??
        item.nama_warga ??
        item.pelapor ??
        item.nama ??
        "-"
    ),

    hp: String(
      item.no_telepon ??
        item.no_hp ??
        item.nomor_hp ??
        item.telepon ??
        item.hp ??
        "-"
    ),

    tanggal,
    jam: String(jamRaw),
    status: String(item.status ?? "Menunggu"),
  };
}

function nilaiWaktu(tanggal: string): number {
  if (!tanggal) return 0;

  const date = new Date(tanggal);
  if (!Number.isNaN(date.getTime())) return date.getTime();

  const bulan: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    mei: 4,
    jun: 5,
    jul: 6,
    agu: 7,
    sep: 8,
    okt: 9,
    nov: 10,
    des: 11,
  };

  const match = tanggal.match(/^(\d{1,2})\s+([a-zA-Z]+)\s+(\d{4})$/);

  if (match) {
    const month = bulan[match[2].toLowerCase().slice(0, 3)];

    if (month !== undefined) {
      return new Date(
        Number(match[3]),
        month,
        Number(match[1])
      ).getTime();
    }
  }

  return 0;
}

export default function DataLaporanPage({
  onBackToDashboard,
  onOpenDetail,
  onDataWarga,
  onPengaturan,
  onProfile,
}: {
  onBackToDashboard: () => void;
  onOpenDetail: (id: number | string) => void;
  onDataWarga: () => void;
  onPengaturan: () => void;
  onProfile: () => void;
}) {
  const [laporanData, setLaporanData] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [tanggalFilter, setTanggalFilter] = useState("Terbaru");
  const [notificationOpen, setNotificationOpen] = useState(false);

  const fetchLaporan = useCallback(async () => {
    try {
      setLoading(true);
      setErrorApi("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Server mengembalikan status ${response.status}.`);
      }

      const result: unknown = await response.json();

      let rows: Record<string, unknown>[];

      if (Array.isArray(result)) {
        rows = result as Record<string, unknown>[];
      } else if (
        result &&
        typeof result === "object" &&
        "data" in result &&
        Array.isArray(result.data)
      ) {
        rows = result.data as Record<string, unknown>[];
      } else {
        throw new Error("Format data dari API tidak sesuai.");
      }

      setLaporanData(
        rows.map((item, index) => normalisasiLaporan(item, index))
      );
    } catch (error) {
      setErrorApi(
        error instanceof Error
          ? error.message
          : "Gagal mengambil data laporan."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  
useEffect(() => {
  void fetchLaporan();

  const handleFocus = () => {
    void fetchLaporan();
  };

  window.addEventListener("focus", handleFocus);

  return () => {
    window.removeEventListener("focus", handleFocus);
  };
}, [fetchLaporan]);

  const filteredData = useMemo(() => {
    return [...laporanData]
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
          statusFilter === "Semua Status" ||
          laporan.status.toLowerCase() === statusFilter.toLowerCase();

        return cocokSearch && cocokStatus;
      })
      .sort((a, b) => {
        const selisih = nilaiWaktu(a.tanggal) - nilaiWaktu(b.tanggal);
        return tanggalFilter === "Terbaru" ? -selisih : selisih;
      });
  }, [laporanData, searchQuery, statusFilter, tanggalFilter]);

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

          <button
            type="button"
            onClick={onDataWarga}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <PeopleIcon />
            <span>Data Warga</span>
          </button>

          <button
            type="button"
            onClick={onPengaturan}
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
        </nav>
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
            <div className="relative">
              <button
                type="button"
                aria-label="Notifikasi"
                onClick={() => setNotificationOpen((prev) => !prev)}
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
                      Laporan
                    </p>
                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Total laporan dari API: {laporanData.length}.
                    </p>
                  </div>

                  <div className="pt-[12px]">
                    <p className="text-[12px] font-semibold text-[#14294A]">
                      Status data
                    </p>
                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      {loading
                        ? "Sedang memuat laporan."
                        : errorApi
                          ? "Data laporan gagal dimuat."
                          : "Data laporan berhasil dimuat."}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onProfile}
              aria-label="Profil"
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
              {loading
                ? "Memuat data laporan..."
                : `Menampilkan ${filteredData.length} laporan`}
            </p>

            <div className="flex items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[38px] rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[12px] text-[#475569] outline-none focus:border-[#00B686]"
              >
                <option>Semua Status</option>
                <option>Menunggu</option>
                <option>Diproses</option>
                <option>Selesai</option>
                <option>Ditolak</option>
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

          {/* PESAN API */}
          {errorApi && (
            <div className="mb-3 flex items-center justify-between gap-3 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
              <span>Gagal mengambil data dari backend: {errorApi}</span>
              <button
                type="button"
                onClick={() => void fetchLaporan()}
                className="shrink-0 font-bold underline"
              >
                Coba lagi
              </button>
            </div>
          )}

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
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-12 text-center text-[12px] text-[#94A3B8]"
                    >
                      Memuat data laporan...
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((laporan, index) => (
                    <tr
                      key={`${laporan.id}-${index}`}
                      onClick={() => onOpenDetail(laporan.id)}
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
                        {laporan.tanggal || "-"}
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
