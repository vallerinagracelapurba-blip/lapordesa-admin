"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLaporan } from "@/services/laporan";
import type { LaporanSummary } from "@/types/domain";
export function useLaporan() {
  const [laporanData, setLaporanData] = useState<LaporanSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorApi, setErrorApi] = useState("");
  const controller = useRef<AbortController | null>(null);
  const load = useCallback((signal: AbortSignal) => {
    return getLaporan(signal).then((rows) => {
      if (!signal.aborted) { setLaporanData(rows); setErrorApi(""); }
    }).catch((error: unknown) => {
      if (!signal.aborted) setErrorApi(error instanceof Error ? error.message : "Gagal mengambil data laporan.");
    }).finally(() => { if (!signal.aborted) setLoading(false); });
  }, []);
  const fetchLaporan = useCallback(() => {
    controller.current?.abort();
    controller.current = new AbortController();
    setLoading(true);
    return load(controller.current.signal);
  }, [load]);
  useEffect(() => {
    controller.current = new AbortController();
    void load(controller.current.signal);
    const handleFocus = () => { void fetchLaporan(); };
    window.addEventListener("focus", handleFocus);
    return () => { controller.current?.abort(); window.removeEventListener("focus", handleFocus); };
  }, [load, fetchLaporan]);
  return { laporanData, loading, errorApi, fetchLaporan };
}
