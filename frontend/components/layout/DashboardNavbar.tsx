
"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { BellIcon, UserIcon } from "./DashboardIcons";

type DashboardNavbarProps = {
  notificationOpen: boolean;
  onToggleNotification: () => void;
  onCloseNotification: () => void;
  onProfile?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  searchPlaceholder?: string;
  notificationContent?: ReactNode;
  unreadCount?: number;
};

export default function DashboardNavbar({
  notificationOpen,
  onToggleNotification,
  onCloseNotification,
  onProfile,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder = "Cari laporan, warga, atau kata kunci...",
  notificationContent,
  unreadCount = 0,
}: DashboardNavbarProps) {
  const [localSearch, setLocalSearch] = useState("");

  const isControlled = typeof onSearchChange === "function";
  const currentSearch = isControlled ? (searchValue ?? "") : localSearch;

  function handleSearchChange(value: string) {
    if (isControlled) {
      onSearchChange?.(value);
    } else {
      setLocalSearch(value);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const keyword = currentSearch.trim();

    if (keyword) {
      onSearchSubmit?.(keyword);
    }
  }

  return (
    <header className="relative z-30 flex h-[74px] w-full shrink-0 items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">
      <form onSubmit={handleSubmit} className="w-[493px] max-w-[65%]">
        <input
          type="search"
          value={currentSearch}
          onChange={(event) => handleSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
          aria-label="Cari laporan atau warga"
          className="h-[40px] w-full rounded-[7px] border border-[#C9D0D8] bg-white px-3 text-[14px] text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#00B686]"
        />
      </form>

      <div className="flex shrink-0 items-center gap-[20px]">
        <div className="relative">
          <button
            type="button"
            aria-label="Notifikasi"
            aria-expanded={notificationOpen}
            onClick={onToggleNotification}
            className="relative text-[#14294A]"
          >
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute -right-[9px] -top-[7px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#E53935] px-1 text-[10px] font-bold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="absolute right-0 top-[42px] z-[9999] w-[340px] max-w-[calc(100vw-32px)] rounded-[10px] border border-[#D9DEE5] bg-white p-[16px] shadow-lg">
              <div className="mb-[12px] flex items-center justify-between">
                <h3 className="text-[14px] font-bold text-[#14294A]">
                  Notifikasi
                </h3>
                <button
                  type="button"
                  aria-label="Tutup notifikasi"
                  onClick={onCloseNotification}
                  className="text-[20px] text-[#64748B] hover:text-[#14294A]"
                >
                  ×
                </button>
              </div>
              {notificationContent}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onProfile}
          aria-label="Profil"
          className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#14294A] bg-white text-[#14294A]"
        >
          <UserIcon />
        </button>
      </div>
    </header>
  );
}
