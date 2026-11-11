import { apiFetch } from "@/services/api";
import { normalisasiLaporan } from "@/lib/laporan";
export async function getLaporan(signal?: AbortSignal) {
  const response = await apiFetch("/laporan", { signal });
  if (!response.ok) throw new Error(`Server mengembalikan status ${response.status}.`);
  const result: unknown = await response.json();
  const rows = Array.isArray(result) ? result : result && typeof result === "object" && "data" in result && Array.isArray(result.data) ? result.data : null;
  if (!rows) throw new Error("Format data dari API tidak sesuai.");
  return rows.map((item: Record<string, unknown>, index: number) => normalisasiLaporan(item, index));
}
