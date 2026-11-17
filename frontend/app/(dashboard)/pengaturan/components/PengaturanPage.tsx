
"use client";

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
  ImageIcon,
  LockIcon,
  ArrowLeftIcon,
} from "./PengaturanIcons";
import { useEffect, useMemo, useState } from "react";

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

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const emptyForm: ProfileForm = {
  nama: "",
  email: "",
  jabatan: "",
  no_telepon: "",
  alamat: "",
};

const emptyPasswordForm: PasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PengaturanPage() {
  const { onBackToDashboard, onLogout } = useAppNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const [passwordForm, setPasswordForm] =
    useState<PasswordForm>(emptyPasswordForm);

  const [formData, setFormData] = useState<ProfileForm>(emptyForm);
  const [savedData, setSavedData] = useState<ProfileForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Mengambil profil admin dari database
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
          throw new Error(result.message || "Gagal mengambil data profil.");
        }

        const profile: ProfileData = result.data;

        const data: ProfileForm = {
          nama: profile.nama ?? "",
          email: profile.email ?? "",
          jabatan: profile.jabatan ?? "",
          no_telepon: profile.no_telepon ?? "",
          alamat: profile.alamat ?? "",
        };

        if (active) {
          setFormData(data);
          setSavedData(data);
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

  const updateField = (field: keyof ProfileForm, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Menyimpan perubahan profil
  const handleSave = async () => {
    if (!formData.nama.trim() || !formData.email.trim()) {
      setError("Nama dan email wajib diisi.");
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
          nama: formData.nama,
          email: formData.email,
          jabatan: formData.jabatan,
          no_telepon: formData.no_telepon,
          alamat: formData.alamat,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || "Gagal menyimpan perubahan profil.");
      }

      const profile: ProfileData = result.data;

      const updatedData: ProfileForm = {
        nama: profile.nama ?? "",
        email: profile.email ?? "",
        jabatan: profile.jabatan ?? "",
        no_telepon: profile.no_telepon ?? "",
        alamat: profile.alamat ?? "",
      };

      setFormData(updatedData);
      setSavedData(updatedData);
      setIsEditing(false);
      setSuccess("Profil berhasil diperbarui.");
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

  const handleCancel = () => {
    setFormData(savedData);
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  // Mengubah nilai input kata sandi
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
    setPasswordSuccess("");
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

  // Mengirim perubahan kata sandi ke backend
  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordSuccess("");

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
        setPasswordError(
          result.message || "Gagal memperbarui kata sandi."
        );
        return;
      }

      setPasswordSuccess(
        result.message || "Kata sandi berhasil diperbarui."
      );

      setPasswordForm(emptyPasswordForm);
      setPasswordOpen(false);
      setShowPasswords(false);
      alert("Kata sandi berhasil diperbarui.");
    } catch {
      setPasswordError(
        "Terjadi kesalahan saat menghubungi server."
      );
    } finally {
      setPasswordSaving(false);
    }
  };

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

  const displayValue = (value: string) => value.trim() || "Belum diisi";

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">
      <section className="min-h-screen">
        <div className="px-[34px] pb-[45px] pt-[36px]">
          {/* TITLE */}
          <div className="mb-[26px] flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToDashboard}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full hover:bg-[#EAF5F2]"
            >
              <ArrowLeftIcon />
            </button>

            <div>
              <h1 className="text-[25px] font-bold leading-tight">
                Ubah Profil
              </h1>

              <p className="mt-[4px] text-[13px] text-[#64748B]">
                Kelola informasi akun dan profil Anda.
              </p>
            </div>
          </div>

          {/* NOTIFICATION */}
          {error && (
            <div className="mb-4 rounded-[8px] border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-[8px] border border-green-200 bg-green-50 px-4 py-3 text-[12px] text-green-700">
              {success}
            </div>
          )}

          {loading ? (
            <div className="rounded-[10px] border border-[#C9D0D8] bg-white p-8 text-center text-[13px] text-[#64748B]">
              Memuat data profil...
            </div>
          ) : (
            <>
              {/* PROFILE + INFORMATION */}
              <div className="grid grid-cols-[225px_1fr] gap-[14px]">
                {/* PROFILE CARD */}
                <section className="rounded-[10px] border border-[#C9D0D8] bg-white px-[18px] py-[18px]">
                  <div className="flex justify-center">
                    <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border border-[#14294A] bg-[#F8FAFC]">
                      <UserLargeIcon />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled
                    title="Fitur foto profil belum tersedia"
                    className="mx-auto mt-[8px] flex h-[37px] cursor-not-allowed items-center gap-2 rounded-[7px] border border-[#AEB7C2] bg-white px-[12px] text-[11px] font-medium opacity-60"
                  >
                    <ImageIcon />
                    Ubah foto profil
                  </button>

                  {/* SUMMARY */}
                  <div className="mt-[18px] space-y-[13px]">
                    <ProfileItem
                      icon={<UserSmallIcon />}
                      label="Nama"
                      value={displayValue(formData.nama)}
                    />

                    <ProfileItem
                      icon={<MailIcon />}
                      label="Email"
                      value={displayValue(formData.email)}
                    />

                    <ProfileItem
                      icon={<BriefcaseIcon />}
                      label="Jabatan"
                      value={displayValue(formData.jabatan)}
                    />

                    <ProfileItem
                      icon={<PhoneIcon />}
                      label="No. HP"
                      value={displayValue(formData.no_telepon)}
                    />

                    <ProfileItem
                      icon={<MapPinIcon />}
                      label="Alamat"
                      value={
                        formData.alamat.split("\n")[0]?.trim() || "Belum diisi"
                      }
                    />
                  </div>
                </section>

                {/* INFORMATION CARD */}
                <section className="rounded-[10px] border border-[#C9D0D8] bg-white">
                  <div className="flex h-[54px] items-center gap-2 border-b border-[#C9D0D8] px-[15px]">
                    <UserSmallIcon />
                    <h2 className="text-[18px] font-bold">
                      Informasi Akun
                    </h2>
                  </div>

                  <div className="px-[18px] py-[15px]">
                    <p className="mb-[14px] text-[14px] font-bold">
                      Data Diri
                    </p>

                    <div className="grid grid-cols-2 gap-x-[90px] gap-y-[15px]">
                      <Field
                        label="Nama lengkap"
                        value={formData.nama}
                        editing={isEditing}
                        onChange={(value) => updateField("nama", value)}
                      />

                      <Field
                        label="Email"
                        type="email"
                        value={formData.email}
                        editing={isEditing}
                        onChange={(value) => updateField("email", value)}
                      />

                      {/* JABATAN */}
                      <div>
                        <label className="mb-[6px] block text-[13px]">
                          Jabatan
                        </label>

                        {isEditing ? (
                          <select
                            value={formData.jabatan}
                            onChange={(e) =>
                              updateField("jabatan", e.target.value)
                            }
                            className="h-[36px] w-full rounded-[6px] border border-[#AEB7C2] bg-white px-3 text-[12px] outline-none focus:border-[#00A97B]"
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
                        ) : (
                          <div className="flex h-[36px] items-center rounded-[6px] border border-[#C9D0D8] px-3 text-[12px]">
                            {displayValue(formData.jabatan)}
                          </div>
                        )}
                      </div>

                      {/* PHONE */}
                      <Field
                        label="No. HP"
                        value={formData.no_telepon}
                        editing={isEditing}
                        onChange={(value) =>
                          updateField("no_telepon", value)
                        }
                      />

                      {/* ADDRESS */}
                      <div className="col-start-2 row-start-2 row-span-2">
                        <label className="mb-[6px] block text-[13px]">
                          Alamat
                        </label>

                        {isEditing ? (
                          <textarea
                            value={formData.alamat}
                            onChange={(e) =>
                              updateField("alamat", e.target.value)
                            }
                            rows={5}
                            className="w-full resize-none rounded-[6px] border border-[#AEB7C2] bg-white px-3 py-2 text-[12px] leading-[18px] outline-none focus:border-[#00A97B]"
                          />
                        ) : (
                          <div className="min-h-[115px] whitespace-pre-line rounded-[6px] border border-[#C9D0D8] px-3 py-2 text-[12px] leading-[18px]">
                            {displayValue(formData.alamat)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ACTION */}
                    <div className="mt-[22px] flex justify-end gap-2">
                      {isEditing && (
                        <button
                          type="button"
                          onClick={handleCancel}
                          disabled={saving}
                          className="h-[38px] rounded-[7px] border border-[#C9D0D8] bg-white px-[17px] text-[12px] font-semibold hover:bg-[#F8FAFC] disabled:opacity-50"
                        >
                          Batal
                        </button>
                      )}

                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => {
                          if (isEditing) {
                            handleSave();
                          } else {
                            setError("");
                            setSuccess("");
                            setIsEditing(true);
                          }
                        }}
                        className="h-[38px] rounded-[7px] bg-[#B9E4D8] px-[18px] text-[12px] font-semibold text-[#087F60] hover:bg-[#A8DDCF] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {saving
                          ? "Menyimpan..."
                          : isEditing
                            ? "Simpan Perubahan"
                            : "Ubah Profil"}
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </>
          )}

          {/* SECURITY */}
          <section className="mt-[16px] rounded-[10px] border border-[#C9D0D8] bg-white">
            <div className="flex items-center gap-2 border-b border-[#D9DEE5] px-[18px] py-[14px]">
              <LockIcon />
              <h2 className="text-[16px] font-bold">
                Keamanan Akun
              </h2>
            </div>

            <div className="flex items-center justify-between px-[18px] py-[16px]">
              <div>
                <p className="text-[13px] font-semibold">
                  Kata Sandi
                </p>

                <p className="mt-[3px] text-[11px] text-[#64748B]">
                  Ubah kata sandi akun secara berkala untuk menjaga keamanan.
                </p>
              </div>

              <button
                type="button"
                onClick={openPasswordModal}
                className="h-[36px] rounded-[7px] border border-[#C9D0D8] bg-white px-[15px] text-[11px] font-semibold hover:border-[#08B884] hover:bg-[#F0FDF8]"
              >
                Ubah Kata Sandi
              </button>
            </div>
          </section>

          {/* LOGOUT */}
          <section className="mt-[16px] rounded-[10px] border border-[#FECACA] bg-white">
            <div className="flex items-center justify-between gap-4 px-[18px] py-[18px]">
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
                className="flex h-[38px] items-center gap-2 rounded-[7px] border border-[#FECACA] bg-white px-[16px] text-[12px] font-semibold text-[#DC2626] hover:bg-[#FEF2F2]"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-4">
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <div className="w-[360px] rounded-[12px] border border-[#D9DEE5] bg-white p-[24px] shadow-xl">
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

/* PROFILE ITEM */
function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-[9px]">
      <div className="mt-[2px]">{icon}</div>

      <div className="min-w-0">
        <p className="text-[18px] font-semibold leading-[18px]">
          {label}
        </p>

        <p className="mt-[2px] truncate text-[13px] text-[#14294A]">
          {value}
        </p>
      </div>
    </div>
  );
}

/* FIELD */
function Field({
  label,
  value,
  editing,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-[6px] block text-[13px]">
        {label}
      </label>

      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-[36px] w-full rounded-[6px] border border-[#AEB7C2] bg-white px-3 text-[12px] outline-none focus:border-[#00A97B]"
        />
      ) : (
        <div className="flex h-[36px] items-center rounded-[6px] border border-[#C9D0D8] px-3 text-[12px]">
          {value || "Belum diisi"}
        </div>
      )}
    </div>
  );
}

/* PASSWORD FIELD */
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
