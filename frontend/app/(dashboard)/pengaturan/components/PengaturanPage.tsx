"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useDashboardHeader } from "@/components/layout/DashboardHeaderContext";

import {
  LogoutIcon,
  UserLargeIcon,
  UserSmallIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  LockIcon,
  ArrowLeftIcon,
} from "./PengaturanIcons";

type ProfileData = {
  id: number;
  nama: string;
  email: string;
  role: string;
  jabatan: string | null;
  no_telepon: string | null;
  alamat: string | null;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const emptyPasswordForm: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PengaturanPage() {
  const router = useRouter();
  const { onBackToDashboard, onLogout } = useAppNavigation();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordForm, setPasswordForm] =
    useState<PasswordForm>(emptyPasswordForm);

  const [logoutOpen, setLogoutOpen] = useState(false);

  // Mengambil informasi profil admin
  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/profile", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || "Gagal mengambil informasi profil."
          );
        }

        if (active) {
          setProfile(result.data as ProfileData);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Terjadi kesalahan saat mengambil profil."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  // Notifikasi pada dashboard header
  const notificationContent = useMemo(
    () => (
      <div className="mt-3 space-y-2">
        <div className="rounded-[8px] bg-[#F8FAFC] p-3">
          <p className="text-[11px] font-semibold text-[#14294A]">
            Laporan baru masuk
          </p>
          <p className="mt-1 text-[10px] text-[#64748B]">
            Jalan Rusak dari Budi Santoso.
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

  const displayValue = (value?: string | null) => {
    return value?.trim() || "Belum diisi";
  };

  // Membuka halaman khusus edit profil
  const handleEditProfile = () => {
    router.push("/pengaturan/profil");
  };

  // Mengubah input kata sandi
  const updatePasswordField = (
    field: keyof PasswordForm,
    value: string
  ) => {
    setPasswordForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setPasswordError("");
  };

  // Membuka modal ubah kata sandi
  const openPasswordModal = () => {
    setPasswordForm(emptyPasswordForm);
    setPasswordError("");
    setShowPasswords(false);
    setPasswordOpen(true);
  };

  // Menutup modal ubah kata sandi
  const closePasswordModal = () => {
    if (passwordSaving) return;

    setPasswordOpen(false);
    setPasswordForm(emptyPasswordForm);
    setPasswordError("");
    setShowPasswords(false);
  };

  // Menyimpan kata sandi baru
  const handleChangePassword = async () => {
    setPasswordError("");

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Semua kolom kata sandi wajib diisi.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Kata sandi baru minimal 8 karakter.");
      return;
    }

    if (new TextEncoder().encode(newPassword).length > 72) {
      setPasswordError("Kata sandi baru maksimal 72 byte.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "Kata sandi baru harus berbeda dari kata sandi lama."
      );
      return;
    }

    try {
      setPasswordSaving(true);

      const response = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal memperbarui kata sandi."
        );
      }

      setPasswordOpen(false);
      setPasswordForm(emptyPasswordForm);
      setShowPasswords(false);

      alert(result.message || "Kata sandi berhasil diperbarui.");
    } catch (err) {
      setPasswordError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghubungi server."
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      <section className="min-h-screen">
        <div className="px-[34px] pb-[45px] pt-[36px]">
          {/* HEADER */}
          <div className="mb-[26px] flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full transition hover:bg-[#EAF5F2]"
            >
              <ArrowLeftIcon />
            </button>

            <div>
              <h1 className="text-[25px] font-bold leading-tight">
                Pengaturan
              </h1>

              <p className="mt-[4px] text-[13px] text-[#64748B]">
                Kelola informasi akun dan keamanan administrator.
              </p>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600">
              {error}
            </div>
          )}

          {/* PROFILE */}
          {loading ? (
            <div className="rounded-[10px] border border-[#C9D0D8] bg-white p-8 text-center text-[13px] text-[#64748B]">
              Memuat informasi profil...
            </div>
          ) : profile ? (
            <section className="overflow-hidden rounded-[10px] border border-[#C9D0D8] bg-white">
              {/* PROFILE HEADER */}
              <div className="flex flex-col gap-5 border-b border-[#D9DEE5] px-[24px] py-[24px] sm:flex-row sm:items-center">
                <div className="flex h-[86px] w-[86px] shrink-0 items-center justify-center rounded-full border border-[#D9DEE5] bg-[#F0FDF8] text-[#087F60]">
                  <UserLargeIcon />
                </div>

                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-[#64748B]">
                    Administrator
                  </p>

                  <h2 className="mt-1 break-words text-[22px] font-bold text-[#14294A]">
                    {displayValue(profile.nama)}
                  </h2>

                  <p className="mt-1 break-all text-[14px] text-[#64748B]">
                    {displayValue(profile.email)}
                  </p>

                  <span className="mt-3 inline-flex rounded-full bg-[#EAF8F3] px-3 py-1 text-[11px] font-semibold text-[#087F60]">
                    {displayValue(profile.jabatan || profile.role)}
                  </span>
                </div>
              </div>

              {/* PROFILE INFORMATION */}
              <div className="px-[24px] py-[22px]">
                <div className="mb-[20px]">
                  <h3 className="text-[17px] font-bold text-[#14294A]">
                    Informasi Akun
                  </h3>

                  <p className="mt-1 text-[12px] text-[#64748B]">
                    Informasi pribadi administrator yang terdaftar.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-x-[40px] gap-y-[22px] md:grid-cols-2">
                  <ProfileDetail
                    icon={<UserSmallIcon />}
                    label="Nama Lengkap"
                    value={profile.nama}
                  />

                  <ProfileDetail
                    icon={<MailIcon />}
                    label="Alamat Email"
                    value={profile.email}
                  />

                  <ProfileDetail
                    icon={<BriefcaseIcon />}
                    label="Jabatan"
                    value={profile.jabatan}
                  />

                  <ProfileDetail
                    icon={<PhoneIcon />}
                    label="Nomor Telepon"
                    value={profile.no_telepon}
                  />

                  <div className="md:col-span-2">
                    <ProfileDetail
                      icon={<MapPinIcon />}
                      label="Alamat"
                      value={profile.alamat}
                      multiline
                    />
                  </div>
                </div>

                {/* EDIT PROFILE BUTTON */}
                <div className="mt-[26px] flex justify-end border-t border-[#E2E8F0] pt-[20px]">
                  <button
                    type="button"
                    onClick={handleEditProfile}
                    className="flex h-[42px] items-center justify-center rounded-[7px] bg-[#B9E4D8] px-[22px] text-[13px] font-semibold text-[#087F60] transition hover:bg-[#A8DDCF]"
                  >
                    Ubah Profil
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <div className="rounded-[10px] border border-[#C9D0D8] bg-white p-8 text-center">
              <p className="text-[13px] text-[#64748B]">
                Informasi profil belum dapat ditampilkan.
              </p>
            </div>
          )}

          {/* SECURITY */}
          <section className="mt-[16px] rounded-[10px] border border-[#C9D0D8] bg-white">
            <div className="flex items-center gap-2 border-b border-[#D9DEE5] px-[18px] py-[14px]">
              <LockIcon />
              <h2 className="text-[16px] font-bold">
                Keamanan Akun
              </h2>
            </div>

            <div className="flex flex-col justify-between gap-4 px-[18px] py-[18px] sm:flex-row sm:items-center">
              <div>
                <p className="text-[14px] font-semibold">
                  Kata Sandi
                </p>

                <p className="mt-[4px] text-[12px] text-[#64748B]">
                  Ubah kata sandi akun secara berkala untuk menjaga keamanan.
                </p>
              </div>

              <button
                type="button"
                onClick={openPasswordModal}
                className="h-[40px] shrink-0 rounded-[7px] border border-[#C9D0D8] bg-white px-[17px] text-[12px] font-semibold transition hover:border-[#08B884] hover:bg-[#F0FDF8]"
              >
                Ubah Kata Sandi
              </button>
            </div>
          </section>

          {/* LOGOUT */}
          <section className="mt-[16px] rounded-[10px] border border-[#FECACA] bg-white">
            <div className="flex flex-col justify-between gap-4 px-[18px] py-[18px] sm:flex-row sm:items-center">
              <div>
                <p className="text-[14px] font-bold text-[#14294A]">
                  Keluar dari Akun
                </p>

                <p className="mt-[4px] text-[12px] text-[#64748B]">
                  Akhiri sesi akun administrator Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setLogoutOpen(true)}
                className="flex h-[40px] shrink-0 items-center justify-center gap-2 rounded-[7px] border border-[#FECACA] bg-white px-[17px] text-[12px] font-semibold text-[#DC2626] transition hover:bg-[#FEF2F2]"
              >
                <LogoutIcon />
                Keluar
              </button>
            </div>
          </section>
        </div>
      </section>

      {/* CHANGE PASSWORD MODAL */}
      {passwordOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[420px] rounded-[12px] border border-[#D9DEE5] bg-white p-[24px] shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#EAF8F3] text-[#087F60]">
                <LockIcon />
              </div>

              <div>
                <h2 className="text-[18px] font-bold text-[#14294A]">
                  Ubah Kata Sandi
                </h2>

                <p className="mt-1 text-[11px] text-[#64748B]">
                  Masukkan kata sandi lama dan kata sandi baru.
                </p>
              </div>
            </div>

            {passwordError && (
              <div className="mt-4 rounded-[7px] border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600">
                {passwordError}
              </div>
            )}

            <div className="mt-5 space-y-4">
              <PasswordField
                label="Kata sandi lama"
                value={passwordForm.currentPassword}
                visible={showPasswords}
                onChange={(value) =>
                  updatePasswordField("currentPassword", value)
                }
              />

              <PasswordField
                label="Kata sandi baru"
                value={passwordForm.newPassword}
                visible={showPasswords}
                onChange={(value) =>
                  updatePasswordField("newPassword", value)
                }
              />

              <PasswordField
                label="Konfirmasi kata sandi baru"
                value={passwordForm.confirmPassword}
                visible={showPasswords}
                onChange={(value) =>
                  updatePasswordField("confirmPassword", value)
                }
              />

              <label className="flex cursor-pointer items-center gap-2 text-[11px] text-[#64748B]">
                <input
                  type="checkbox"
                  checked={showPasswords}
                  onChange={(e) => setShowPasswords(e.target.checked)}
                  className="h-3.5 w-3.5 accent-[#08B884]"
                />
                Tampilkan kata sandi
              </label>

              <p className="text-[10px] text-[#64748B]">
                Kata sandi baru harus memiliki minimal 8 karakter.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={closePasswordModal}
                disabled={passwordSaving}
                className="h-[38px] rounded-[7px] border border-[#C9D0D8] bg-white px-[16px] text-[12px] font-semibold hover:bg-[#F8FAFC] disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={passwordSaving}
                className="h-[38px] rounded-[7px] bg-[#08B884] px-[16px] text-[12px] font-semibold text-white hover:bg-[#079F73] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {passwordSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOGOUT CONFIRMATION */}
      {logoutOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[360px] rounded-[12px] border border-[#D9DEE5] bg-white p-[24px] shadow-xl">
            <div className="text-center">
              <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#FFF4E5] text-[#D97706]">
                <LogoutIcon />
              </div>

              <h2 className="mt-4 text-[18px] font-bold text-[#14294A]">
                Yakin mau logout?
              </h2>

              <p className="mt-2 text-[12px] leading-[18px] text-[#64748B]">
                Anda akan keluar dari akun LaporDesa.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setLogoutOpen(false)}
                className="h-[38px] rounded-[7px] border border-[#C9D0D8] bg-white px-[18px] text-[12px] font-semibold text-[#14294A] hover:bg-[#F8FAFC]"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={() => onLogout()}
                className="h-[38px] rounded-[7px] bg-[#08B884] px-[18px] text-[12px] font-semibold text-white hover:bg-[#079F73]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// PROFILE DETAIL
function ProfileDetail({
  icon,
  label,
  value,
  multiline = false,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
  multiline?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-[3px] shrink-0 text-[#087F60]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-medium text-[#64748B]">
          {label}
        </p>

        <p
          className={`mt-[5px] break-words text-[15px] font-semibold leading-[23px] text-[#14294A] ${
            multiline ? "whitespace-pre-line" : ""
          }`}
        >
          {value?.trim() || "Belum diisi"}
        </p>
      </div>
    </div>
  );
}

// PASSWORD FIELD
function PasswordField({
  label,
  value,
  visible,
  onChange,
}: {
  label: string;
  value: string;
  visible: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-[6px] block text-[12px] font-medium text-[#14294A]">
        {label}
      </label>

      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="new-password"
        className="h-[40px] w-full rounded-[6px] border border-[#C9D0D8] bg-white px-3 text-[12px] outline-none focus:border-[#00A97B]"
        placeholder="Masukkan kata sandi"
      />
    </div>
  );
}