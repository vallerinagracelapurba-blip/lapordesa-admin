
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getLaporan } from "@/services/laporan";
import type { LaporanSummary } from "@/types/domain";

export function useLaporan(
  searchQuery = "",
  statusFilter = "Semua Status",
  tanggalFilter = "Terbaru"
) {
  const [laporanData, setLaporanData] = useState<LaporanSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const controller = useRef<AbortController | null>(null);

  const load = useCallback(
    async (
      page: number,
      limit: number,
      search: string,
      status: string,
      sort: string,
      signal: AbortSignal
    ) => {
      try {
        const result = await getLaporan(
          page,
          limit,
          {
            search,
            status,
            sort,
          },
          signal
        );

        if (!signal.aborted) {
          setLaporanData(result.data);
          setTotal(result.total);
          setTotalPages(result.totalPages);
          setCurrentPage(result.page);
          setErrorApi("");
        }
      } catch (error: unknown) {
        if (!signal.aborted) {
          setErrorApi(
            error instanceof Error
              ? error.message
              : "Gagal mengambil data laporan."
          );
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    []
  );

  const fetchLaporan = useCallback(() => {
    controller.current?.abort();

    const newController = new AbortController();
    controller.current = newController;

    setLoading(true);

    return load(
      currentPage,
      itemsPerPage,
      searchQuery,
      statusFilter,
      tanggalFilter,
      newController.signal
    );
  }, [
    load,
    currentPage,
    itemsPerPage,
    searchQuery,
    statusFilter,
    tanggalFilter,
  ]);

  useEffect(() => {
    controller.current?.abort();

    const newController = new AbortController();
    controller.current = newController;

    setLoading(true);

    void load(
      currentPage,
      itemsPerPage,
      searchQuery,
      statusFilter,
      tanggalFilter,
      newController.signal
    );

    return () => {
      newController.abort();
    };
  }, [
    currentPage,
    itemsPerPage,
    searchQuery,
    statusFilter,
    tanggalFilter,
    load,
  ]);

  useEffect(() => {
    const handleFocus = () => {
      void fetchLaporan();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchLaporan]);

  return {
    laporanData,
    loading,
    errorApi,
    fetchLaporan,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    total,
    totalPages,
  };
}
