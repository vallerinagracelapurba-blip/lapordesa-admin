"use client";

import { BellIcon, UserIcon } from "./DashboardIcons";

type DashboardNavbarProps = {
  notificationOpen: boolean;
  onToggleNotification: () => void;
  onCloseNotification: () => void;
  onProfile?: () => void;
};

export default function DashboardNavbar({ notificationOpen, onToggleNotification, onCloseNotification, onProfile }: DashboardNavbarProps) {
  return (<header className="flex h-[74px] items-center justify-between border-b border-[#D9DEE5] bg-[#F8FAFC] px-[24px]">

          <div className="w-[493px]">
            <input
              type="text"
              placeholder="Cari laporan, warga, atau kata kunci..."
              className="
                h-[40px]
                w-full
                rounded-[7px]
                border
                border-[#C9D0D8]
                bg-white
                px-3
                text-[14px]
                text-[#334155]
                outline-none
                placeholder:text-[#6B7280]
                focus:border-[#00B686]
              "
            />
          </div>

          <div className="flex items-center gap-[20px]">

            {/* NOTIFICATION */}
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  onToggleNotification
                }
                className="text-[#14294A]"
              >
                <BellIcon />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 top-[42px] z-[9999] w-[300px] rounded-[10px] border border-[#D9DEE5] bg-white p-[16px] shadow-lg">

                  <div className="mb-[12px] flex items-center justify-between">
                    <h3 className="text-[14px] font-bold text-[#14294A]">
                      Notifikasi
                    </h3>

                    <button
                      type="button"
                      onClick={() => onCloseNotification}
                      className="text-[18px] text-[#64748B]"
                    >
                      ×
                    </button>
                  </div>

                  <div className="border-b border-[#E1E7ED] pb-[12px]">
                    <p className="text-[12px] font-semibold text-[#14294A]">
                      Laporan baru diterima
                    </p>

                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Laporan &quot;Jalan Rusak&quot; telah masuk.
                    </p>
                  </div>

                  <div className="pt-[12px]">
                    <p className="text-[12px] font-semibold text-[#14294A]">
                      Laporan diperbarui
                    </p>

                    <p className="mt-[3px] text-[10px] text-[#64748B]">
                      Status &quot;Sampah Menumpuk&quot; sedang diproses.
                    </p>
                  </div>

                </div>
              )}

            </div>

            {/* PROFILE */}
            <button
              type="button"
              onClick={onProfile}
              className="
                flex h-[42px] w-[42px]
                items-center justify-center
                rounded-full
                border
                border-[#14294A]
                bg-white
                text-[#14294A]
              "
            >
              <UserIcon />
            </button>

          </div>

        </header>
  );
}