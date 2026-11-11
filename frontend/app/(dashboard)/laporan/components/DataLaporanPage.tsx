
"use client";

import { useLaporan } from "@/hooks/useLaporan";
import { nilaiWaktu } from "@/lib/laporan";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useDashboardHeader } from "@/components/layout/DashboardHeaderContext";
import { ArrowLeftIcon } from "./DataLaporanIcons";
import { useMemo, useState } from "react";

export default function DataLaporanPage() {
  const { onBackToDashboard, onOpenDetail } = useAppNavigation();
  const { laporanData, loading, errorApi, fetchLaporan } = useLaporan();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [tanggalFilter, setTanggalFilter] = useState("Terbaru");

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

  const notificationContent = useMemo(
    () => (
      <>
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
      </>
    ),
    [laporanData.length, loading, errorApi]
  );

  useDashboardHeader({
    searchValue: searchQuery,
    onSearchChange: setSearchQuery,
    searchPlaceholder: "Cari laporan, warga, atau kata kunci...",
    notificationContent,
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
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
    </main>
  );
}
