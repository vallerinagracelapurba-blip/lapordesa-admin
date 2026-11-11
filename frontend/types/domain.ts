export type DashboardStats = {
  total: number;
  menunggu: number;
  diproses: number;
  selesai: number;
  ditolak: number;
};

export type LaporanSummary = {
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

export type Warga = {
  id: number;
  user_id: number | null;
  nik: string | null;
  nama: string;
  alamat: string | null;
  no_telepon: string | null;
  created_at: string;
};

export type StatusLaporan = "Menunggu" | "Diproses" | "Selesai" | "Ditolak";

export type LaporanDetail = {
  id: number;
  judul: string;
  kategori_id?: number;
  nama_kategori?: string;
  deskripsi?: string;
  alamat_lokasi?: string;
  foto?: string | null;
  status: StatusLaporan;
  created_at?: string;
  updated_at?: string;
  nama_pengirim?: string;
  no_telepon?: string;
};
