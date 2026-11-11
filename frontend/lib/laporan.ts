import type { LaporanSummary } from "@/types/domain";


export function normalisasiTanggal(value: unknown): string {
  if (!value) return "";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function normalisasiLaporan(
  item: Record<string, unknown>,
  index: number
): LaporanSummary {
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

export function nilaiWaktu(tanggal: string): number {
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
