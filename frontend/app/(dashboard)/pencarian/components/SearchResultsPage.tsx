
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";
import { selectLaporan } from "@/lib/selectedLaporan";

type Laporan = {
  id: number;
  judul: string;
  deskripsi: string | null;
  alamat_lokasi: string | null;
  status: string;
  nama_pengirim: string | null;
  nama_kategori: string | null;
  created_at: string;
};

type Warga = {
  id: number;
  nik: string | null;
  nama: string;
  alamat: string | null;
  no_telepon: string | null;
};

type SearchResponse = {
  success: boolean;
  data: {
    laporan: Laporan[];
    warga: Warga[];
  };
  totals: {
    laporan: number;
    warga: number;
  };
};

export default function SearchResultsPage({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const router = useRouter();

  const [results, setResults] = useState<SearchResponse["data"]>({
    laporan: [],
    warga: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function search() {
      setLoading(true);
      setError("");

      try {
        const response = await apiFetch(
          `/search?q=${encodeURIComponent(initialQuery)}`
        );

        const result = (await response.json()) as SearchResponse;

        if (!response.ok || !result.success) {
          throw new Error("Pencarian gagal dilakukan.");
        }

        if (active) {
          setResults(result.data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mencari data."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (initialQuery.trim()) {
      search();
    } else {
      setResults({ laporan: [], warga: [] });
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [initialQuery]);

  function openLaporan(id: number) {
    selectLaporan(id);
    router.push("/laporan/detail");
  }

  function openWarga(id: number) {
    router.push(`/warga/detail?id=${id}`);
  }

  return (
    <main className="min-h-full bg-[#F8FAFC] p-6">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[#14294A]">
          Hasil Pencarian
        </h1>

        <p className="mt-1 text-[14px] text-[#64748B]">
          Hasil pencarian untuk{" "}
          <span className="font-semibold text-[#14294A]">
            "{initialQuery}"
          </span>
        </p>
      </div>

      {loading && (
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-8 text-center text-[#64748B]">
          Sedang mencari data...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border border-red-200 bg-white p-6 text-center text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#14294A]">
                Laporan
              </h2>
              <span className="text-[13px] text-[#64748B]">
                {results.laporan.length} hasil
              </span>
            </div>

            {results.laporan.length === 0 ? (
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 text-[14px] text-[#64748B]">
                Tidak ada laporan yang cocok.
              </div>
            ) : (
              <div className="space-y-3">
                {results.laporan.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openLaporan(item.id)}
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white p-5 text-left transition hover:border-[#00B686] hover:shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-[#14294A]">
                          {item.judul}
                        </h3>

                        <p className="mt-1 text-[13px] text-[#64748B]">
                          {item.nama_kategori || "Tanpa kategori"}
                          {" • "}
                          {item.nama_pengirim || "Pengirim tidak diketahui"}
                        </p>
                      </div>

                      <span className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[12px] font-medium text-[#475569]">
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-[13px] text-[#475569]">
                      {item.deskripsi || "Tidak ada deskripsi."}
                    </p>

                    <p className="mt-2 text-[12px] text-[#64748B]">
                      {item.alamat_lokasi || "Lokasi tidak tersedia"}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-[#14294A]">
                Data Warga
              </h2>
              <span className="text-[13px] text-[#64748B]">
                {results.warga.length} hasil
              </span>
            </div>

            {results.warga.length === 0 ? (
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 text-[14px] text-[#64748B]">
                Tidak ada data warga yang cocok.
              </div>
            ) : (
              <div className="space-y-3">
                {results.warga.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => openWarga(item.id)}
                    className="w-full rounded-lg border border-[#E2E8F0] bg-white p-5 text-left transition hover:border-[#00B686] hover:shadow-sm"
                  >
                    <h3 className="font-semibold text-[#14294A]">
                      {item.nama}
                    </h3>

                    <p className="mt-1 text-[13px] text-[#64748B]">
                      NIK: {item.nik || "-"}
                    </p>

                    <p className="mt-1 text-[13px] text-[#64748B]">
                      {item.alamat || "Alamat tidak tersedia"}
                    </p>

                    <p className="mt-1 text-[13px] text-[#64748B]">
                      {item.no_telepon || "Nomor telepon tidak tersedia"}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
