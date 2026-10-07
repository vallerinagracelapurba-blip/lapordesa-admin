"use client";

import { useState } from "react";

export default function PengaturanPage({
  onBackToDashboard,
  onDataLaporan,
  onDataWarga,
  onLogout,
  onProfile,
}: {
  onBackToDashboard: () => void;
  onDataLaporan: () => void;
  onDataWarga: () => void;
  onLogout: () => void;
  onProfile?: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const [nama, setNama] = useState("Joko Sucipto");
  const [email, setEmail] = useState("joko@gmail.com");
  const [jabatan, setJabatan] = useState("Ketua RT 01");
  const [hp, setHp] = useState("08123456");
  const [alamat, setAlamat] = useState(
    "Jl. Melati, RT 01, RW 01\nSukaharjo 1\nKecamatan Sukoharjo\nKabupaten Pringsewu\nLampung"
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-[var(--font-poppins)] text-[#14294A]">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 z-20 h-screen w-[244px] border-r border-[#D9DEE5] bg-[#F8FAFC]">

        {/* LOGO */}
        <div className="flex h-[110px] items-center justify-center">
          <img
            src="/login-logo.png"
            alt="LaporDesa"
            className="w-[190px] object-contain"
          />
        </div>

        {/* MENU */}
        <nav className="mt-[36px] px-[25px]">

          {/* DASHBOARD */}
          <button
            type="button"
            onClick={onBackToDashboard}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <HomeIcon />
            <span>Dashboard</span>
          </button>

          {/* DATA LAPORAN */}
          <button
            type="button"
            onClick={onDataLaporan}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <DocumentIcon />
            <span>Data Laporan</span>
          </button>

          {/* DATA WARGA */}
          <button
            type="button"
            onClick={onDataWarga}
            className="mb-3 flex h-[52px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[16px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <PeopleIcon />
            <span>Data Warga</span>
          </button>

          {/* PENGATURAN ACTIVE */}
          <button
            type="button"
            className="flex h-[52px] w-full items-center gap-4 rounded-[13px] bg-[#B9E4D8] px-4 text-left text-[16px] font-semibold text-[#14294A]"
          >
            <SettingsIcon />
            <span>Pengaturan</span>
          </button>
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-0 left-0 w-full border-t border-[#D9DEE5] p-[25px]">
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="flex h-[48px] w-full items-center gap-4 rounded-[13px] px-4 text-left text-[15px] font-semibold text-[#14294A] hover:bg-[#EAF5F2]"
          >
            <LogoutIcon />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="ml-[244px] min-h-screen">

        {/* HEADER */}
        <header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">

          <div className="w-[493px]">
            <input
              type="text"
              placeholder="Cari laporan, warga, atau kata kunci..."
              className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00B686]"
            />
          </div>

          <div className="flex items-center gap-[20px]">

            {/* NOTIFICATION */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setNotificationOpen((prev) => !prev)
                }
                className="text-[#14294A]"
              >
                <BellIcon />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-[38px] z-50 w-[300px] rounded-[10px] border border-[#D9DEE5] bg-white p-3 shadow-lg">

                  <p className="text-[13px] font-bold text-[#14294A]">
                    Notifikasi
                  </p>

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
                </div>
              )}
            </div>

            {/* PROFILE */}
            <button
              type="button"
              onClick={onProfile}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#14294A] bg-white text-[#14294A]"
            >
              <UserIcon />
            </button>

          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

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

          {/* =====================================================
              PROFILE + INFORMATION
          ===================================================== */}

          <div className="grid grid-cols-[225px_1fr] gap-[14px]">

            {/* PROFILE CARD */}

            <section className="rounded-[10px] border border-[#C9D0D8] bg-white px-[18px] py-[18px]">

              {/* AVATAR */}
              <div className="flex justify-center">

                <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full border border-[#14294A] bg-[#F8FAFC]">
                  <UserLargeIcon />
                </div>

              </div>

              {/* PHOTO BUTTON */}
              <button
                type="button"
                className="mx-auto mt-[8px] flex h-[37px] items-center gap-2 rounded-[7px] border border-[#AEB7C2] bg-white px-[12px] text-[11px] font-medium hover:bg-[#EAF5F2]"
              >
                <ImageIcon />
                Ubah foto profil
              </button>

              {/* SUMMARY */}

              <div className="mt-[18px] space-y-[13px]">

                <ProfileItem
                  icon={<UserSmallIcon />}
                  label="Nama"
                  value={nama}
                />

                <ProfileItem
                  icon={<MailIcon />}
                  label="Email"
                  value={email}
                />

                <ProfileItem
                  icon={<BriefcaseIcon />}
                  label="Jabatan"
                  value={jabatan}
                />

                <ProfileItem
                  icon={<PhoneIcon />}
                  label="No. HP"
                  value={hp}
                />

                <ProfileItem
                  icon={<MapPinIcon />}
                  label="Alamat"
                  value="Jl. Melati, RT 01, RW 01"
                />

              </div>
            </section>

            {/* INFORMATION CARD */}

            <section className="rounded-[10px] border border-[#C9D0D8] bg-white">

              {/* CARD HEADER */}
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

                  {/* NAMA */}
                  <Field
                    label="Nama lengkap"
                    value={nama}
                    editing={isEditing}
                    onChange={setNama}
                  />

                  {/* EMAIL */}
                  <Field
                    label="Email"
                    value={email}
                    editing={isEditing}
                    onChange={setEmail}
                  />

                  {/* JABATAN */}
                  <div>
                    <label className="mb-[6px] block text-[13px]">
                      Jabatan
                    </label>

                    {isEditing ? (
                      <select
                        value={jabatan}
                        onChange={(e) =>
                          setJabatan(e.target.value)
                        }
                        className="h-[36px] w-full rounded-[6px] border border-[#AEB7C2] bg-white px-3 text-[12px] outline-none focus:border-[#00A97B]"
                      >
                        <option>Ketua RT 01</option>
                        <option>Sekretaris RT 01</option>
                        <option>Bendahara RT 01</option>
                      </select>
                    ) : (
                      <div className="flex h-[36px] items-center rounded-[6px] border border-[#C9D0D8] px-3 text-[12px]">
                        {jabatan}
                      </div>
                    )}
                  </div>

                  {/* HP */}
                  <Field
                    label="No. HP"
                    value={hp}
                    editing={isEditing}
                    onChange={setHp}
                  />

                  {/* ALAMAT */}
                  <div className="col-start-2 row-start-2 row-span-2">
                    <label className="mb-[6px] block text-[13px]">
                      Alamat
                    </label>

                    {isEditing ? (
                      <textarea
                        value={alamat}
                        onChange={(e) =>
                          setAlamat(e.target.value)
                        }
                        rows={5}
                        className="w-full resize-none rounded-[6px] border border-[#AEB7C2] bg-white px-3 py-2 text-[12px] leading-[18px] outline-none focus:border-[#00A97B]"
                      />
                    ) : (
                      <div className="min-h-[115px] whitespace-pre-line rounded-[6px] border border-[#C9D0D8] px-3 py-2 text-[12px] leading-[18px]">
                        {alamat}
                      </div>
                    )}
                  </div>

                </div>

                {/* ACTION */}
                <div className="mt-[22px] flex justify-end gap-2">

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="h-[38px] rounded-[7px] border border-[#C9D0D8] bg-white px-[17px] text-[12px] font-semibold hover:bg-[#F8FAFC]"
                    >
                      Batal
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      if (isEditing) {
                        handleSave();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="h-[38px] rounded-[7px] bg-[#B9E4D8] px-[18px] text-[12px] font-semibold text-[#087F60] hover:bg-[#A8DDCF]"
                  >
                    {isEditing
                      ? "Simpan Perubahan"
                      : "Ubah Profil"}
                  </button>

                </div>

              </div>
            </section>
          </div>

          {/* =====================================================
              SECURITY
          ===================================================== */}

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
                className="h-[36px] rounded-[7px] border border-[#C9D0D8] bg-white px-[15px] text-[11px] font-semibold hover:bg-[#EAF5F2]"
              >
                Ubah Kata Sandi
              </button>

            </div>
          </section>

        </div>
      </section>

      {/* =====================================================
          LOGOUT CONFIRMATION
      ===================================================== */}

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
                onClick={onLogout}
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

/* =====================================================
   PROFILE ITEM
===================================================== */

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

/* =====================================================
   FIELD
===================================================== */

function Field({
  label,
  value,
  editing,
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-[6px] block text-[13px]">
        {label}
      </label>

      {editing ? (
        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="h-[36px] w-full rounded-[6px] border border-[#AEB7C2] bg-white px-3 text-[12px] outline-none focus:border-[#00A97B]"
        />
      ) : (
        <div className="flex h-[36px] items-center rounded-[6px] border border-[#C9D0D8] px-3 text-[12px]">
          {value}
        </div>
      )}
    </div>
  );
}

/* =====================================================
   ICONS
===================================================== */

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
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
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3" />
      <path d="M5 20c.7-3.3 3-5 7-5s6.3 1.7 7 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-.1.7 0 0 0 0 0-1.5v-.1H15v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 0 0 0 1.5 1h.1V14h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 4v16" />
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

function UserLargeIcon() {
  return (
    <svg width="66" height="66" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
    </svg>
  );
}

function UserSmallIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.5 3.1-5 7-5s6.2 1.5 7 5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 3.5 9 3l2 5-2.5 1.5a14 14 0 0 0 6 6L16 13l5 2v2.5a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9" r="1.5" />
      <path d="m4 17 5-5 3 3 2-2 6 5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}