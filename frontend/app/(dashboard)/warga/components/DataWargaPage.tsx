
"use client";

import type { FormEvent } from "react";
import type { Warga } from "@/types/domain";
import { apiFetch } from "@/services/api";
import { useRouter } from "next/navigation";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { ArrowLeftIcon } from "./DataWargaIcons";
import { useEffect, useMemo, useState } from "react";
import { useDashboardHeader } from "@/components/layout/DashboardHeaderContext";

export default function DataWargaPage() {
  const router = useRouter();
  const { onBackToDashboard } = useAppNavigation();

  const [warga, setWarga] = useState<Warga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const notificationContent = useMemo(
    () => (
      <div>
        <p className="text-[12px] font-semibold">Datawarga</p>
        <p className="mt-1 text-[11px] text-[#64748B]">
          Informasi warga ditampilkan dari database.
        </p>
      </div>
    ),
    []
  );

  useDashboardHeader({
    searchValue: searchQuery,
    onSearchChange: setSearchQuery,
    searchPlaceholder: "Cari nama, nomor HP, atau alamat...",
    notificationContent,
  });

  useEffect(() => {
    async function fetchWarga() {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch("/warga");
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

  async function handleTambahWarga(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    if (!nama.trim()) {
      setFormError("Nama warga wajib diisi.");
      return;
    }

    if (noTelepon && !/^\d+$/.test(noTelepon)) {
      setFormError("Nomor HP hanya boleh berisi angka.");
      return;
    }

    try {
      setSaving(true);

      const response = await apiFetch("/warga", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: nama.trim(),
          alamat: alamat.trim() || null,
          no_telepon: noTelepon.trim() || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Gagal menambahkan data warga.");
      }

      setWarga((prev) => [result.data, ...prev]);

      setNama("");
      setAlamat("");
      setNoTelepon("");
      setShowAddForm(false);
      setFormError("");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menambahkan warga."
      );
    } finally {
      setSaving(false);
    }
  }

  const filteredWarga = warga.filter((item) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      !query ||
      item.nama.toLowerCase().includes(query) ||
      (item.no_telepon ?? "").toLowerCase().includes(query) ||
      (item.alamat ?? "").toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
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

            <h1 className="text-[25px] font-bold">DataWarga</h1>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormError("");
              setShowAddForm(true);
            }}
            className="h-[49px] rounded-[7px] border border-[#C9D0D8] bg-white px-[15px] text-[13px] font-semibold hover:bg-[#EAF5F2]"
          >
            + Tambah Warga
          </button>
        </div>

        {/* TABEL WARGA */}
        <section className="overflow-hidden rounded-[10px] border border-[#C9D0D8] bg-white">
          <div className="flex h-[55px] items-center justify-between px-[15px]">
            <p className="text-[13px] text-[#64748B]">
              Total {filteredWarga.length} warga
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#D9DEE5] bg-[#F8FAFC]">
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    NAMA
                  </th>
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    ALAMAT
                  </th>
                  <th className="px-[14px] py-[14px] text-left text-[11px] font-bold text-[#64748B]">
                    NO. HP
                  </th>
                  <th className="px-[14px] py-[14px] text-center text-[11px] font-bold text-[#64748B]">
                    AKSI
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-[12px] text-[#94A3B8]"
                    >
                      Memuat data warga...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-[12px] text-red-600"
                    >
                      {error}
                      <p className="mt-2 text-[#64748B]">
                        Pastikan backend berjalan di localhost:5000.
                      </p>
                    </td>
                  </tr>
                ) : filteredWarga.length > 0 ? (
                  filteredWarga.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => router.push(`/warga/detail?id=${item.id}`)}
                      className="cursor-pointer border-b border-[#D9DEE5] last:border-b-0 hover:bg-[#FAFCFB]"
                    >
                      <td className="px-[14px] py-[14px]">
                        <div className="flex items-center gap-3">
                          <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#B9E4D8] text-[11px] font-bold text-[#087F60]">
                            {item.nama.charAt(0).toUpperCase()}
                          </span>
                          <span className="text-[12px] font-bold text-[#14294A]">
                            {item.nama}
                          </span>
                        </div>
                      </td>

                      <td className="px-[14px] py-[14px] text-[11px] text-[#475569]">
                        {item.alamat || "—"}
                      </td>

                      <td className="px-[14px] py-[14px] text-[11px] text-[#475569]">
                        {item.no_telepon || "—"}
                      </td>

                      <td className="px-[14px] py-[14px] text-center text-[18px] text-[#64748B]">
                        &gt;
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-[12px] text-[#94A3B8]"
                    >
                      {warga.length === 0
                        ? "Belum ada data warga di database."
                        : "Data warga tidak ditemukan."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex h-[50px] items-center justify-between px-[15px]">
            <p className="text-[12px] text-[#334155]">
              Menampilkan {filteredWarga.length} dari {warga.length} warga
            </p>
          </div>
        </section>
      </div>

      {/* MODAL TAMBAH WARGA */}
      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-[480px] rounded-[12px] bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[19px] font-bold text-[#14294A]">
                Tambah Warga
              </h2>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                disabled={saving}
                className="text-[24px] leading-none text-[#64748B] hover:text-[#14294A]"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleTambahWarga} className="space-y-4">
              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#334155]">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  required
                  className="h-[43px] w-full rounded-[7px] border border-[#C9D0D8] px-3 text-[12px] outline-none focus:border-[#087F60]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#334155]">
                  Alamat
                </label>
                <textarea
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Masukkan alamat warga"
                  rows={3}
                  className="w-full rounded-[7px] border border-[#C9D0D8] px-3 py-3 text-[12px] outline-none focus:border-[#087F60]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[12px] font-semibold text-[#334155]">
                  Nomor HP
                </label>
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={noTelepon}
                  onChange={(e) => {
                    const angka = e.target.value.replace(/[^0-9]/g, "");
                    setNoTelepon(angka);
                  }}
                  placeholder="Masukkan nomor HP"
                  className="h-[43px] w-full rounded-[7px] border border-[#C9D0D8] px-3 text-[12px] outline-none focus:border-[#087F60]"
                />
              </div>

              {formError && (
                <p className="rounded-[7px] bg-red-50 p-3 text-[12px] text-red-600">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  disabled={saving}
                  className="h-[42px] rounded-[7px] border border-[#C9D0D8] px-5 text-[12px] font-semibold text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-[42px] rounded-[7px] bg-[#087F60] px-5 text-[12px] font-semibold text-white hover:bg-[#066B50] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Warga"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
