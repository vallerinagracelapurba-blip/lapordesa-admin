
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useDashboardHeader } from "@/components/layout/DashboardHeaderContext";
import { apiFetch } from "@/services/api";

type WargaDetail = {
  id: number;
  nama: string;
  alamat: string | null;
  no_telepon: string | null;
  created_at: string;
};

function ArrowLeftIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="m19 6-1 14H6L5 6" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  );
}

function formatTanggal(value: string) {
  if (!value) return "Belum tersedia";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Belum tersedia";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function DetailProfilWargaPage() {
  const { onBackToWarga } = useAppNavigation();
  const searchParams = useSearchParams();
  const wargaId = searchParams.get("id");

  const [warga, setWarga] = useState<WargaDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const notificationContent = useMemo(
    () => (
      <div>
        <p className="text-[12px] font-semibold">Detail Data Warga</p>
        <p className="mt-1 text-[11px] text-[#64748B]">
          Informasi warga dari database.
        </p>
      </div>
    ),
    []
  );

  useDashboardHeader({
    searchPlaceholder: "Cari laporan, warga, atau kata kunci...",
    notificationContent,
  });

  useEffect(() => {
    let isActive = true;

    async function fetchDetailWarga() {
      try {
        setLoading(true);
        setError("");
        setWarga(null);

        // Reset seluruh state dialog saat ID warga berubah.
        setShowDeleteConfirm(false);
        setDeleting(false);
        setDeleteError("");

        if (!wargaId || !/^\d+$/.test(wargaId) || Number(wargaId) <= 0) {
          throw new Error(
            "ID warga tidak valid. Silakan pilih warga dari halaman Data Warga."
          );
        }

        const response = await apiFetch(`/warga/${wargaId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Gagal mengambil detail warga.");
        }

        if (isActive) {
          setWarga(result.data);
        }
      } catch (err) {
        if (isActive) {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mengambil detail warga."
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchDetailWarga();

    return () => {
      isActive = false;
    };
  }, [wargaId]);

  async function handleDeleteWarga() {
    if (!warga || deleting) return;

    try {
      setDeleting(true);
      setDeleteError("");

      const response = await apiFetch(`/warga/${warga.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus data warga.");
      }

      setShowDeleteConfirm(false);
      onBackToWarga();
    } catch (err) {
      setDeleteError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghapus warga."
      );
      setDeleting(false);
    }
  }

  const valueOrFallback = (value: string | null | undefined) =>
    value?.trim() || "Belum tersedia";

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      <div className="px-[34px] pb-[40px] pt-[30px]">
        <div className="mb-[22px] flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToWarga}
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
          >
            <ArrowLeftIcon />
          </button>

          <div>
            <h1 className="text-[25px] font-bold leading-none">
              Detail Profil Warga
            </h1>
            <p className="mt-2 text-[13px] text-[#64748B]">
              Informasi lengkap mengenai data warga
            </p>
          </div>
        </div>

        {loading ? (
          <section className="rounded-[10px] border border-[#C9D0D8] bg-white px-6 py-16 text-center text-[13px] text-[#64748B]">
            Memuat detail warga...
          </section>
        ) : error ? (
          <section className="rounded-[10px] border border-[#C9D0D8] bg-white px-6 py-12 text-center">
            <p className="text-[14px] font-semibold text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={onBackToWarga}
              className="mt-5 rounded-[7px] bg-[#087F60] px-5 py-3 text-[12px] font-semibold text-white hover:bg-[#066B50]"
            >
              Kembali ke Data Warga
            </button>
          </section>
        ) : warga ? (
          <>
            {/* Header profil warga */}
            <section className="rounded-[10px] border border-[#C9D0D8] bg-white px-[24px] py-[20px]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-[18px]">
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#DDF1EB] text-[#087F60]">
                    <UserIcon />
                  </div>

                  <div>
                    <h2 className="text-[21px] font-bold">{warga.nama}</h2>
                    <p className="mt-1 text-[13px] text-[#64748B]">
                      Data warga terdaftar
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[12px] text-[#64748B]">
                    Terdaftar sejak
                  </p>
                  <p className="mt-1 text-[14px] font-semibold">
                    {formatTanggal(warga.created_at)}
                  </p>
                </div>
              </div>
            </section>

            {/* Informasi pribadi dan riwayat */}
            <div className="mt-[15px] grid grid-cols-[minmax(0,1fr)_300px] gap-[15px]">
              <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[22px]">
                <div className="mb-[20px]">
                  <h2 className="text-[17px] font-bold">
                    Informasi Pribadi
                  </h2>
                  <p className="mt-1 text-[12px] text-[#64748B]">
                    Data identitas dan informasi dasar warga
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-x-[35px] gap-y-[24px]">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Nama Lengkap
                    </p>
                    <p className="mt-1 text-[14px] font-semibold">
                      {warga.nama}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      ID Warga
                    </p>
                    <p className="mt-1 text-[14px] font-semibold">
                      {warga.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Nomor HP
                    </p>
                    <p className="mt-1 text-[14px] font-semibold">
                      {valueOrFallback(warga.no_telepon)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Tanggal Pendaftaran
                    </p>
                    <p className="mt-1 text-[14px] font-semibold">
                      {formatTanggal(warga.created_at)}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                      Alamat
                    </p>
                    <p className="mt-1 text-[14px] font-semibold">
                      {valueOrFallback(warga.alamat)}
                    </p>
                  </div>
                </div>
              </section>

              <div className="space-y-[15px]">
                {/* Riwayat data */}
                <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[20px]">
                  <h2 className="text-[15px] font-bold">Riwayat Data</h2>

                  <p className="mt-1 text-[11px] text-[#94A3B8]">
                    Tanggal warga terdaftar
                  </p>

                  <div className="mt-[18px] rounded-[8px] bg-[#F8FAFC] px-[13px] py-[12px]">
                    <p className="text-[11px] text-[#94A3B8]">
                      Terdaftar sejak
                    </p>
                    <p className="mt-1 text-[13px] font-bold">
                      {formatTanggal(warga.created_at)}
                    </p>
                  </div>
                </section>

                {/* Hapus data warga */}
                <section className="rounded-[10px] border border-[#E7CACA] bg-white p-[20px]">
                  <h2 className="text-[15px] font-bold text-[#B83232]">
                    Hapus Data Warga
                  </h2>

                  <p className="mt-2 text-[11px] leading-[18px] text-[#64748B]">
                    Hapus data warga ini secara permanen dari sistem.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setDeleteError("");
                      setShowDeleteConfirm(true);
                    }}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[7px] bg-[#B83232] px-4 py-[11px] text-[12px] font-semibold text-white transition hover:bg-[#982727]"
                  >
                    <TrashIcon />
                    Hapus Warga
                  </button>
                </section>
              </div>
            </div>

            <div className="mt-[15px] rounded-[10px] border border-dashed border-[#B8C2CC] bg-[#F8FAFC] px-[18px] py-[12px]">
              <p className="text-[11px] text-[#64748B]">
                Data warga digunakan untuk kebutuhan administrasi dan pengelolaan penduduk.
              </p>
            </div>
          </>
        ) : null}
      </div>

      {/* Dialog konfirmasi hapus */}
      {showDeleteConfirm && warga && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-warga-title"
            className="w-full max-w-[420px] rounded-[12px] bg-white p-6 shadow-xl"
          >
            <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#FCE8E8] text-[#B83232]">
              <TrashIcon />
            </div>

            <h2
              id="delete-warga-title"
              className="mt-4 text-[18px] font-bold text-[#14294A]"
            >
              Hapus Data Warga?
            </h2>

            <p className="mt-2 text-[13px] leading-[21px] text-[#64748B]">
              Apakah kamu yakin ingin menghapus data{" "}
              <span className="font-semibold text-[#14294A]">
                {warga.nama}
              </span>
              ? Data yang sudah dihapus tidak dapat dikembalikan.
            </p>

            {deleteError && (
              <p className="mt-4 rounded-[7px] bg-[#FCE8E8] px-3 py-2 text-[12px] leading-[19px] text-[#B83232]">
                {deleteError}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteError("");
                }}
                className="rounded-[7px] border border-[#CBD5E1] px-4 py-[10px] text-[12px] font-semibold text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteWarga}
                className="rounded-[7px] bg-[#B83232] px-4 py-[10px] text-[12px] font-semibold text-white hover:bg-[#982727] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
