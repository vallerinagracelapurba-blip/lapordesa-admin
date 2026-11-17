
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useDashboardHeader } from "@/components/layout/DashboardHeaderContext";

type ProfileData = {
  id: number;
  nama: string;
  email: string;
  role: string;
  jabatan: string | null;
  no_telepon: string | null;
  alamat: string | null;
};

type ProfileForm = {
  nama: string;
  email: string;
  jabatan: string;
  no_telepon: string;
  alamat: string;
};

const emptyForm: ProfileForm = {
  nama: "",
  email: "",
  jabatan: "",
  no_telepon: "",
  alamat: "",
};

export default function UbahProfilPage() {
  const { onBackToPengaturan } = useAppNavigation();

  const [formData, setFormData] = useState<ProfileForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const notificationContent = useMemo(
    () => (
      <div className="mt-3 space-y-2">
        <div className="rounded-[8px] bg-[#F8FAFC] p-3">
          <p className="text-[11px] font-semibold text-[#14294A]">
            Laporan baru masuk
          </p>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Laporan Jalan Rusak dari Budi Santoso.
          </p>
        </div>

        <div className="rounded-[8px] bg-[#F8FAFC] p-3">
          <p className="text-[11px] font-semibold text-[#14294A]">
            Laporan diperbarui
          </p>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Status laporan berubah menjadi Diproses.
          </p>
        </div>
      </div>
    ),
    []
  );

  useDashboardHeader({
    searchPlaceholder: "Cari laporan, warga, atau kata kunci...",
    notificationContent,
  });

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/profile", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Gagal mengambil data profil.");
      }

      const profile: ProfileData = result.data;

      setFormData({
        nama: profile.nama ?? "",
        email: profile.email ?? "",
        jabatan: profile.jabatan ?? "",
        no_telepon: profile.no_telepon ?? "",
        alamat: profile.alamat ?? "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data profil."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateField = (field: keyof ProfileForm, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    if (!formData.nama.trim() || !formData.email.trim()) {
      setError("Nama lengkap dan email wajib diisi.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError("Format email tidak valid.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama.trim(),
          email: formData.email.trim(),
          jabatan: formData.jabatan,
          no_telepon: formData.no_telepon.trim(),
          alamat: formData.alamat.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal menyimpan perubahan profil."
        );
      }

      if (result.data) {
        const profile: ProfileData = result.data;

        setFormData({
          nama: profile.nama ?? "",
          email: profile.email ?? "",
          jabatan: profile.jabatan ?? "",
          no_telepon: profile.no_telepon ?? "",
          alamat: profile.alamat ?? "",
        });
      }

      setSuccess("Profil berhasil diperbarui.");

      setTimeout(() => {
        onBackToPengaturan();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menyimpan profil."
      );
    } finally {
      setSaving(false);
    }
  };

  const displayValue = (value: string) =>
    value.trim() || "Belum diisi";

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      <div className="px-[34px] pb-[45px] pt-[36px]">
        {/* TITLE */}
        <div className="mb-[26px] flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToPengaturan}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
            aria-label="Kembali ke pengaturan"
          >
            <ArrowLeftIcon />
          </button>

          <div>
            <h1 className="text-[25px] font-bold leading-tight">
              Ubah Profil
            </h1>
            <p className="mt-[5px] text-[14px] text-[#64748B]">
              Perbarui informasi identitas akun administrator Anda.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-[8px] border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
            {success}
          </div>
        )}

        {loading ? (
          <div className="rounded-[10px] border border-[#C9D0D8] bg-white p-10 text-center text-[14px] text-[#64748B]">
            Memuat data profil...
          </div>
        ) : (
          <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-[18px]">
            {/* PROFILE CARD */}
            <section className="rounded-[10px] border border-[#C9D0D8] bg-white p-[20px]">
              <div className="flex flex-col items-center">
                <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border border-[#14294A] bg-[#F8FAFC]">
                  <UserIconLarge />
                </div>

                <p className="mt-3 text-[14px] font-semibold">
                  Foto Profil
                </p>
                <p className="mt-1 text-center text-[12px] text-[#64748B]">
                  Foto profil belum tersedia.
                </p>
              </div>

              <div className="mt-[24px] space-y-[20px]">
                <ProfileInfo
                  icon={<UserSmallIcon />}
                  title="Nama"
                  value={displayValue(formData.nama)}
                />

                <ProfileInfo
                  icon={<MailIcon />}
                  title="Email"
                  value={displayValue(formData.email)}
                />

                <ProfileInfo
                  icon={<DocumentSmallIcon />}
                  title="Jabatan"
                  value={displayValue(formData.jabatan)}
                />

                <ProfileInfo
                  icon={<PhoneIcon />}
                  title="No. HP"
                  value={displayValue(formData.no_telepon)}
                />

                <ProfileInfo
                  icon={<MapPinIcon />}
                  title="Alamat"
                  value={displayValue(formData.alamat)}
                />
              </div>
            </section>

            {/* FORM CARD */}
            <section className="rounded-[10px] border border-[#C9D0D8] bg-white">
              <div className="flex h-[60px] items-center gap-3 border-b border-[#C9D0D8] px-[20px]">
                <UserSmallIcon />
                <h2 className="text-[19px] font-bold">
                  Informasi Akun
                </h2>
              </div>

              <div className="p-[22px]">
                <h3 className="mb-[20px] text-[16px] font-bold">
                  Data Diri
                </h3>

                <div className="grid grid-cols-2 gap-x-[28px] gap-y-[22px]">
                  <FormField
                    label="Nama Lengkap"
                    value={formData.nama}
                    onChange={(value) => updateField("nama", value)}
                  />

                  <FormField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => updateField("email", value)}
                  />

                  <div>
                    <label className="mb-[8px] block text-[14px] font-medium">
                      Jabatan
                    </label>

                    <select
                      value={formData.jabatan}
                      onChange={(e) =>
                        updateField("jabatan", e.target.value)
                      }
                      className="h-[44px] w-full rounded-[7px] border border-[#AEB7C2] bg-white px-3 text-[14px] outline-none focus:border-[#00A97B]"
                    >
                      <option value="">Pilih jabatan</option>

                      {![
                        "Ketua RT 01",
                        "Sekretaris RT 01",
                        "Bendahara RT 01",
                      ].includes(formData.jabatan) &&
                        formData.jabatan && (
                          <option value={formData.jabatan}>
                            {formData.jabatan}
                          </option>
                        )}

                      <option value="Ketua RT 01">Ketua RT 01</option>
                      <option value="Sekretaris RT 01">
                        Sekretaris RT 01
                      </option>
                      <option value="Bendahara RT 01">
                        Bendahara RT 01
                      </option>
                    </select>
                  </div>

                  <FormField
                    label="Nomor HP"
                    value={formData.no_telepon}
                    onChange={(value) =>
                      updateField("no_telepon", value)
                    }
                  />

                  <div className="col-span-2">
                    <label className="mb-[8px] block text-[14px] font-medium">
                      Alamat
                    </label>

                    <textarea
                      value={formData.alamat}
                      onChange={(e) =>
                        updateField("alamat", e.target.value)
                      }
                      rows={5}
                      className="w-full resize-y rounded-[7px] border border-[#AEB7C2] bg-white px-3 py-3 text-[14px] leading-[22px] outline-none focus:border-[#00A97B]"
                      placeholder="Masukkan alamat lengkap"
                    />
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-[28px] flex justify-end gap-3 border-t border-[#E1E5EA] pt-[20px]">
                  <button
                    type="button"
                    onClick={onBackToPengaturan}
                    disabled={saving}
                    className="h-[44px] rounded-[7px] border border-[#BFC7D0] bg-white px-[22px] text-[14px] font-semibold hover:bg-[#F1F5F9] disabled:opacity-50"
                  >
                    Batal
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="h-[44px] rounded-[7px] bg-[#08B884] px-[24px] text-[14px] font-semibold text-white hover:bg-[#079F73] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Menyimpan..." : "Simpan Perubahan"}
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

/* PROFILE INFO */
function ProfileInfo({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-[10px]">
      <div className="mt-[3px] shrink-0">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-[#64748B]">
          {title}
        </p>
        <p className="mt-[3px] break-words text-[17px] font-semibold leading-[24px] text-[#14294A]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* FORM FIELD */
function FormField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-[8px] block text-[14px] font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[44px] w-full rounded-[7px] border border-[#AEB7C2] bg-white px-3 text-[14px] outline-none focus:border-[#00A97B]"
      />
    </div>
  );
}

/* ICONS */
function UserIconLarge() {
  return (
    <svg width="62" height="62" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
    </svg>
  );
}

function UserSmallIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DocumentSmallIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 3.5h3l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5l1.5-2 4 1.5v3c0 1-1 2-2 2C10 18 6 14 4 7.5c-.3-1.8.5-4 2.5-4Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}
