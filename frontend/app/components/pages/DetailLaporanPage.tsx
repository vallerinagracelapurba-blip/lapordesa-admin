
"use client";

import { useEffect, useState } from "react";

type StatusLaporan = "Menunggu" | "Diproses" | "Selesai" | "Ditolak";

type Laporan = {
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

export default function DetailLaporanPage({
  laporanId,
  onBackToLaporan,
  onBackToDashboard,
  onDataWarga,
  onPengaturan,
  onProfile,
}: {
  laporanId: number | string;
  onBackToLaporan: () => void;
  onBackToDashboard: () => void;
  onDataWarga: () => void;
  onPengaturan: () => void;
  onProfile: () => void;
}) {
  const [laporan, setLaporan] = useState<Laporan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<StatusLaporan>("Menunggu");
  const [savingStatus, setSavingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchLaporan() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/laporan/${laporanId}`,
          {
            signal: controller.signal,
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil detail laporan.");
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error("Data laporan tidak ditemukan.");
        }

        setLaporan(result.data);
        setStatus(result.data.status || "Menunggu");
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Terjadi kesalahan saat mengambil data.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchLaporan();

    return () => controller.abort();
  }, [laporanId]);

  const formatTanggal = (tanggal?: string) => {
    if (!tanggal) return "-";

    const date = new Date(tanggal);
    if (Number.isNaN(date.getTime())) return "-";

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTanggalPanjang = (tanggal?: string) => {
    if (!tanggal) return "";

    const date = new Date(tanggal);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleStatusChange = async (newStatus: StatusLaporan) => {
    if (!laporan || savingStatus || newStatus === status) return;

    const previousStatus = status;

    try {
      setSavingStatus(true);
      setStatusMessage("");

      const response = await fetch(
        `http://localhost:5000/api/laporan/${laporan.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menyimpan status laporan.");
      }

      setStatus(newStatus);

      if (result.data) {
        setLaporan(result.data);
      }

      setStatusMessage("Status berhasil disimpan ke database.");
    } catch (err) {
      setStatus(previousStatus);
      setStatusMessage(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan status."
      );
    } finally {
      setSavingStatus(false);
    }
  };

  const fotoUrl = laporan?.foto
    ? laporan.foto.startsWith("http")
      ? laporan.foto
      : `http://localhost:5000/${laporan.foto.replace(/^\/+/, "")}`
    : null;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
        <p className="text-sm font-semibold">Memuat detail laporan...</p>
      </main>
    );
  }

  if (error || !laporan) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
        <p className="text-sm text-red-600">
          {error || "Data laporan tidak ditemukan."}
        </p>
        <button
          type="button"
          onClick={onBackToLaporan}
          className="rounded-lg bg-[#B9E4D8] px-4 py-2 text-sm font-semibold"
        >
          Kembali ke Data Laporan
        </button>
      </main>
    );
  }

  const menuClass =
    "mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]";

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
            className={menuClass}
          >
            <HomeIcon />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={onBackToLaporan}
            className={`${menuClass} bg-[#B9E4D8]`}
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          <button
            type="button"
            onClick={onDataWarga}
            className={menuClass}
          >
            <PeopleIcon />
            <span>Data Warga</span>
          </button>

          <button
            type="button"
            onClick={onPengaturan}
            className={menuClass}
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
        </nav>
      </aside>

      <section className="ml-[244px] min-h-screen">
        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-6">
          <div className="w-[493px]">
            <input
              type="text"
              placeholder="Cari laporan, warga, atau kata kunci..."
              autoComplete="off"
              className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00B686]"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <button
                type="button"
                aria-label="Buka notifikasi"
                onClick={() => setNotificationOpen((prev) => !prev)}
                className="text-[#14294A]"
              >
                <BellIcon />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-[42px] z-50 w-[300px] rounded-[10px] border border-[#D9DEE5] bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold">Notifikasi</h3>
                    <button
                      type="button"
                      onClick={() => setNotificationOpen(false)}
                      aria-label="Tutup notifikasi"
                      className="text-lg text-[#64748B]"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-xs font-semibold">
                    Laporan yang sedang dibuka
                  </p>
                  <p className="mt-1 text-[10px] text-[#64748B]">
                    {laporan.judul}
                  </p>
                  <div className="mt-3 border-t border-[#E1E7ED] pt-3">
                    <p className="text-xs font-semibold">Status laporan</p>
                    <p className="mt-1 text-[10px] text-[#64748B]">
                      Status saat ini: {status}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onProfile}
              aria-label="Buka profil"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#14294A] bg-white"
            >
              <UserIcon />
            </button>
          </div>
        </header>

        <div className="px-[34px] pb-[35px] pt-[36px]">
          <div className="mb-6 flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToLaporan}
              aria-label="Kembali"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
            >
              <ArrowLeftIcon />
            </button>
            <h1 className="text-[25px] font-bold">Detail Laporan</h1>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-[18px]">
            <div className="space-y-3">
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[22px]">
                <div className="flex items-start gap-[13px]">
                  <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center">
                    <ReportIcon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold">{laporan.judul}</h2>
                    <p className="mt-1 text-xs font-medium text-[#00A97B]">
                      {laporan.nama_kategori || "Tidak ada kategori"}
                    </p>
                  </div>
                </div>

                <div className="mt-[18px] grid grid-cols-3 gap-5 border-t border-[#E2E8F0] pt-[15px]">
                  <div>
                    <p className="text-[11px] text-[#64748B]">Pelapor</p>
                    <div className="mt-1 flex items-center gap-1">
                      <UserSmallIcon />
                      <p className="break-words text-xs font-semibold">
                        {laporan.nama_pengirim || "-"}
                      </p>
                    </div>
                    {laporan.no_telepon && (
                      <p className="mt-1 text-[10px] text-[#64748B]">
                        {laporan.no_telepon}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[11px] text-[#64748B]">Lokasi</p>
                    <p className="mt-1 break-words text-xs font-semibold">
                      {laporan.alamat_lokasi || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#64748B]">Tanggal</p>
                    <p className="mt-1 text-xs font-semibold">
                      {formatTanggal(laporan.created_at)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[18px]">
                <h3 className="mb-2 text-[13px] font-bold">
                  Deskripsi Laporan
                </h3>
                <p className="max-w-[680px] whitespace-pre-line break-words text-[13px] leading-[1.6] text-[#475569]">
                  {laporan.deskripsi || "Tidak ada deskripsi."}
                </p>
              </section>

              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[18px]">
                <h3 className="mb-3 text-[13px] font-bold">Bukti Foto</h3>
                <div className="flex min-h-[150px] flex-wrap gap-2">
                  <div className="flex h-[150px] w-[220px] items-center justify-center overflow-hidden rounded-[9px] bg-[#E2E8F0]">
                    {fotoUrl ? (
                      <img
                        src={fotoUrl}
                        alt={`Bukti laporan ${laporan.judul}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[#64748B]">
                        <CameraIcon />
                        <span className="mt-2 text-xs">
                          Belum ada foto laporan
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <div>
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[18px]">
                <h3 className="text-sm font-bold">Status Laporan</h3>

                <select
                  value={status}
                  disabled={savingStatus}
                  onChange={(e) =>
                    void handleStatusChange(e.target.value as StatusLaporan)
                  }
                  className="mt-[14px] h-[40px] w-full rounded-lg border border-[#8ED2BD] bg-[#B9E4D8] px-[14px] text-xs font-semibold text-[#087F60] outline-none focus:border-[#00A97B] disabled:cursor-wait disabled:opacity-60"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Ditolak">Ditolak</option>
                </select>

                <p
                  aria-live="polite"
                  className={`mt-2 text-[10px] ${
                    statusMessage.includes("berhasil")
                      ? "text-green-600"
                      : statusMessage
                        ? "text-red-600"
                        : "text-[#64748B]"
                  }`}
                >
                  {savingStatus
                    ? "Menyimpan status..."
                    : statusMessage ||
                      "Perubahan status akan disimpan ke database."}
                </p>

                <div className="relative mt-[25px] pl-3">
                  <div className="absolute bottom-2 left-4 top-2 w-px bg-[#B9E4D8]" />

                  <TimelineItem
                    title="Menunggu"
                    date={formatTanggalPanjang(laporan.created_at)}
                    active
                  />
                  <TimelineItem
                    title="Diproses"
                    date={
                      status === "Diproses"
                        ? formatTanggalPanjang(laporan.updated_at)
                        : ""
                    }
                    active={status === "Diproses" || status === "Selesai"}
                  />
                  <TimelineItem
                    title="Selesai"
                    date={
                      status === "Selesai"
                        ? formatTanggalPanjang(laporan.updated_at)
                        : ""
                    }
                    active={status === "Selesai"}
                  />
                  <TimelineItem
                    title="Ditolak"
                    date={
                      status === "Ditolak"
                        ? formatTanggalPanjang(laporan.updated_at)
                        : ""
                    }
                    active={status === "Ditolak"}
                    last
                  />
                </div>

                <div className="mt-[25px]">
                  <h3 className="mb-[9px] text-[13px] font-bold">
                    Lihat lokasi di peta
                  </h3>
                  <div className="flex h-[145px] w-full items-center justify-center overflow-hidden rounded-[9px] border border-[#C9D0D8] bg-[#E2E8F0]">
                    <p className="px-4 text-center text-[11px] text-[#64748B]">
                      Peta belum tersedia untuk lokasi ini.
                    </p>
                  </div>
                  <p className="mt-2 break-words text-[11px] text-[#64748B]">
                    {laporan.alamat_lokasi || "Alamat tidak tersedia"}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TimelineItem({
  title,
  date,
  active = false,
  last = false,
}: {
  title: string;
  date: string;
  active?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`relative flex gap-3 ${last ? "" : "mb-5"}`}>
      <div
        className={`relative z-10 mt-[2px] h-[10px] w-[10px] shrink-0 rounded-full ${
          active ? "bg-[#0A9F6E]" : "bg-[#CBD5E1]"
        }`}
      />
      <div className="-mt-[2px]">
        <p
          className={`text-[11px] font-semibold ${
            active ? "text-[#14294A]" : "text-[#94A3B8]"
          }`}
        >
          {title}
        </p>
        {date && (
          <p className="mt-[2px] text-[8px] text-[#94A3B8]">{date}</p>
        )}
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-7h6v7" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c.5-3.3 2.7-5 6-5s5.5 1.7 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 15c2.7.2 4.5 1.8 5 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.5-1H6v-2.6h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.6v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.6 1Z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
    </svg>
  );
}

function UserSmallIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 21c.5-4 3-6 7-6s6.5 2 7 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="39" height="43" viewBox="0 0 39 43" fill="none" stroke="#14294A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 2h17l8 8v31H7z" />
      <path d="M24 2v8h8M13 18h13M13 24h13M13 30h9" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
