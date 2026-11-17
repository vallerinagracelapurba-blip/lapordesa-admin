
import { apiFetch } from "@/services/api";
import { normalisasiLaporan } from "@/lib/laporan";
import type { LaporanSummary } from "@/types/domain";

export interface LaporanPaginatedResponse {
  data: LaporanSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface LaporanFilter {
  search?: string;
  status?: string;
  sort?: string;
}

export async function getLaporan(
  page = 1,
  limit = 10,
  filters: LaporanFilter = {},
  signal?: AbortSignal
): Promise<LaporanPaginatedResponse> {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (filters.search?.trim()) {
    params.set("search", filters.search.trim());
  }

  if (filters.status && filters.status !== "Semua Status") {
    params.set("status", filters.status);
  }

  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  const response = await apiFetch(
    `/laporan?${params.toString()}`,
    { signal }
  );

  if (!response.ok) {
    throw new Error(
      `Server mengembalikan status ${response.status}.`
    );
  }

  const result: unknown = await response.json();

  if (
    !result ||
    typeof result !== "object" ||
    !("data" in result) ||
    !Array.isArray(result.data)
  ) {
    throw new Error("Format data dari API tidak sesuai.");
  }

  const metadata = result as {
    data: Record<string, unknown>[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };

  return {
    data: metadata.data.map((item, index) =>
      normalisasiLaporan(item, index)
    ),
    total: metadata.total,
    page: metadata.page,
    limit: metadata.limit,
    totalPages: metadata.totalPages,
  };
}
