"use client";

import { useCallback, useMemo, useState } from "react";
import { useLaporan } from "@/hooks/useLaporan";
import { nilaiWaktu } from "@/lib/laporan";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useDashboardHeader } from "@/components/layout/DashboardHeaderContext";
import { ArrowLeftIcon } from "./DataLaporanIcons";

const ITEMS_PER_PAGE = 10;

export default function DataLaporanPage() {
  const { onBackToDashboard, onOpenDetail } = useAppNavigation();
  const { laporanData, loading, errorApi, fetchLaporan } = useLaporan();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [tanggalFilter, setTanggalFilter] = useState("Terbaru");
  const [currentPage, setCurrentPage] = useState(1);

  const handleHeaderSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

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

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const startData =
    filteredData.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endData = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredData.length
  );

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
    onSearchChange: handleHeaderSearchChange,
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
              : `Menampilkan ${startData}–${endData} dari ${filteredData.length} laporan`}
          </p>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              onChange={(e) => {
                setTanggalFilter(e.target.value);
                setCurrentPage(1);
              }}
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
              ) : paginatedData.length > 0 ? (
                paginatedData.map((laporan, index) => (
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

        {/* PAGINATION */}
        {!loading && filteredData.length > 0 && (
          <div className="mt-[16px] flex items-center justify-between gap-4">
            <p className="text-[12px] text-[#64748B]">
              Halaman {currentPage} dari {totalPages}
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => Math.max(1, page - 1))
                }
                aria-label="Halaman sebelumnya"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#D9DEE5] text-[#475569] hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                )
                .map((page, index, pages) => (
                  <span key={page} className="flex items-center gap-1">
                    {index > 0 && page - pages[index - 1] > 1 && (
                      <span className="px-1 text-[#94A3B8]">...</span>
                    )}

                    <button
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? "page" : undefined}
                      className={`h-[34px] min-w-[34px] rounded-[6px] border px-2 text-[12px] font-medium ${
                        currentPage === page
                          ? "border-[#00A97B] bg-[#00A97B] text-white"
                          : "border-[#D9DEE5] bg-white text-[#475569] hover:bg-[#F1F5F9]"
                      }`}
                    >
                      {page}
                    </button>
                  </span>
                ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  )
                }
                aria-label="Halaman berikutnya"
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#D9DEE5] text-[#475569] hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}