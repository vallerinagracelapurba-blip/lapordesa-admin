"use client";

import {
  HomeIcon,
  DocumentIcon,
  PeopleIcon,
  SettingsIcon,
  BellIcon,
  UserIcon,
  ArrowLeftIcon,
} from "./components/DataWargaIcons";
import { useEffect, useState } from "react";

type Warga = {
  id: number;
  user_id: number | null;
  nik: string | null;
  nama: string;
  alamat: string | null;
  no_telepon: string | null;
  created_at: string;
};

export default function DataWargaPage({
  onBackToDashboard,
  onDataLaporan,
  onOpenDetail,
  onPengaturan,
  onProfile,
  onTambahWarga,
}: {
  onBackToDashboard: () => void;
  onDataLaporan: () => void;
  onOpenDetail: () => void;
  onPengaturan: () => void;
  onProfile: () => void;
  onTambahWarga: () => void;
}) {
  const [warga, setWarga] = useState<Warga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    async function fetchWarga() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:5000/api/warga");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil data warga.");
        }

        setWarga(result.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil data warga."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchWarga();
  }, []);

  const filteredWarga = warga.filter((item) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      !query ||
      item.nama.toLowerCase().includes(query) ||
      (item.nik ?? "").toLowerCase().includes(query) ||
      (item.no_telepon ?? "").toLowerCase().includes(query) ||
      (item.alamat ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
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
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <HomeIcon />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={onDataLaporan}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          <button
            type="button"
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] bg-[#B9E4D8] px-4 text-left text-[16px] font-semibold"
          >
            <PeopleIcon />
            <span>Data Warga</span>
          </button>

          <button
            type="button"
            onClick={onPengaturan}
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold hover:bg-[#EAF5F2]"
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
        </nav>
      </aside>

      <section className="ml-[244px] min-h-screen">
        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">
          <div className="w-[430px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, NIK, nomor HP, atau alamat..."
              autoComplete="off"
              className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00A97B]"
            />
          </div>

          <div className="flex items-center gap-[20px]">
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationOpen((prev) => !prev)}
                className="text-[#14294A]"
              >
                <BellIcon />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-[42px] z-50 w-[300px] rounded-[10px] border border-[#D9DEE5] bg-white p-[16px] shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[14px] font-bold">Notifikasi</h3>
                    <button
                      type="button"
                      onClick={() => setNotificationOpen(false)}
                      className="text-[18px] text-[#64748B]"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-[12px] font-semibold">
                    Data warga
                  </p>
                  <p className="mt-1 text-[11px] text-[#64748B]">
                    Informasi warga ditampilkan dari database.
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onProfile}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#14294A] bg-white"
            >
              <UserIcon />
            </button>
          </div>
        </header>

        <div className="px-[34px] pb-[35px] pt-[32px]">
          <div className="mb-[19px] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onBackToDashboard}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
              >
                <ArrowLeftIcon />
              </button>
              <h1 className="text-[25px] font-bold">Data Warga</h1>
            </div>

            <button
              type="button"
              onClick={onTambahWarga}
              className="h-[49px] rounded-[7px] border border-[#C9D0D8] bg-white px-[15px] text-[13px] font-semibold hover:bg-[#EAF5F2]"
            >
              + Tambah Warga
            </button>
          </div>

          <section className="overflow-hidden rounded-[8px] border border-[#C9D0D8] bg-white">
            <div className="flex h-[55px] items-center justify-between px-[15px]">
              <p className="text-[13px] text-[#64748B]">
                Total {filteredWarga.length} warga
              </p>
            </div>

            <div className="grid grid-cols-[1.2fr_1fr_1.5fr_1fr_35px] items-center border-y border-[#C9D0D8] bg-[#E1E1E1] px-[15px] py-[16px] text-[13px] font-bold">
              <div className="pl-[32px]">Nama</div>
              <div>NIK</div>
              <div>Alamat</div>
              <div>No. HP</div>
              <div />
            </div>

            {loading ? (
              <div className="flex h-[120px] items-center justify-center text-[13px] text-[#64748B]">
                Memuat data warga...
              </div>
            ) : error ? (
              <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 px-4 text-center text-[13px] text-red-600">
                <p>{error}</p>
                <p className="text-[#64748B]">
                  Pastikan backend berjalan di localhost:5000.
                </p>
              </div>
            ) : filteredWarga.length > 0 ? (
              filteredWarga.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={onOpenDetail}
                  className="grid min-h-[60px] w-full grid-cols-[1.2fr_1fr_1.5fr_1fr_35px] items-center border-b border-[#C9D0D8] px-[15px] text-left text-[12px] font-medium last:border-b-0 hover:bg-[#F5FBF9]"
                >
                  <span className="flex items-center gap-[13px] pr-2">
                    <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#B9E4D8] text-[11px] font-bold text-[#087F60]">
                      {item.nama.charAt(0).toUpperCase()}
                    </span>
                    <span>{item.nama}</span>
                  </span>
                  <span className="break-words pr-2">{item.nik || "—"}</span>
                  <span className="break-words pr-3">{item.alamat || "—"}</span>
                  <span className="break-words pr-2">{item.no_telepon || "—"}</span>
                  <span className="text-[20px]">&gt;</span>
                </button>
              ))
            ) : (
              <div className="flex h-[120px] items-center justify-center text-[13px] text-[#64748B]">
                {warga.length === 0
                  ? "Belum ada data warga di database."
                  : "Data warga tidak ditemukan."}
              </div>
            )}

            <div className="flex h-[50px] items-center justify-between px-[15px]">
              <p className="text-[12px] text-[#334155]">
                Menampilkan {filteredWarga.length} dari {warga.length} warga
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
