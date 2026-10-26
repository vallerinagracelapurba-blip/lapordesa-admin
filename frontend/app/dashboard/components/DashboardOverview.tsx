"use client";

import { useState } from "react";
import { CheckIcon, ClockIcon, DocumentIcon, XIcon } from "./DashboardIcons";

type DashboardStats = {
  total: number;
  diproses: number;
  selesai: number;
  ditolak: number;
};

type DashboardOverviewProps = {
  stats: DashboardStats;
  onOpenDetail: () => void;
  onDataLaporan: () => void;
};

export default function DashboardOverview({ stats, onOpenDetail, onDataLaporan }: DashboardOverviewProps) {
  const [filterHari, setFilterHari] = useState("7 hari terakhir");
  const [filterOpen, setFilterOpen] = useState(false);
  const [ringkasanOpen, setRingkasanOpen] = useState(false);

  return (<div className="px-[34px] pb-[35px] pt-[36px]">

          {/* TITLE */}
          <div className="mb-[24px]">
            <h1 className="text-[25px] font-bold leading-tight text-[#14294A]">
              Selamat Datang, Pengelola RT 01
            </h1>

            <p className="mt-[3px] text-[14px] text-[#14294A]">
              Berikut adalah ringkasan laporan terbaru di lingkungan Anda.
            </p>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-4 gap-[12px]">

            <div className="flex h-[96px] items-center gap-[14px] rounded-[10px] border border-[#E1E7ED] bg-white px-[20px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#B9E4D8] text-[#087F60]">
                <DocumentIcon />
              </div>

              <div>
                <p className="text-[22px] font-bold leading-none text-[#14294A]">
                  {stats.total}
                </p>

                <p className="mt-[4px] text-[13px] text-[#14294A]">
                  Total Laporan
                </p>
              </div>
            </div>

            <div className="flex h-[96px] items-center gap-[14px] rounded-[10px] border border-[#E1E7ED] bg-white px-[20px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#DDEFEA] text-[#087F60]">
                <ClockIcon />
              </div>

              <div>
                <p className="text-[22px] font-bold leading-none text-[#14294A]">
                  {stats.diproses}
                </p>

                <p className="mt-[4px] text-[13px] text-[#14294A]">
                  Diproses
                </p>
              </div>
            </div>

            <div className="flex h-[96px] items-center gap-[14px] rounded-[10px] border border-[#E1E7ED] bg-white px-[20px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#B9E4D8] text-[#087F60]">
                <CheckIcon />
              </div>

              <div>
                <p className="text-[22px] font-bold leading-none text-[#14294A]">
                  {stats.selesai}
                </p>

                <p className="mt-[4px] text-[13px] text-[#14294A]">
                  Selesai
                </p>
              </div>
            </div>

            <div className="flex h-[96px] items-center gap-[14px] rounded-[10px] border border-[#E1E7ED] bg-white px-[20px]">
              <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#DDEFEA] text-[#087F60]">
                <XIcon />
              </div>

              <div>
                <p className="text-[22px] font-bold leading-none text-[#14294A]">
                  {stats.ditolak}
                </p>

                <p className="mt-[4px] text-[13px] text-[#14294A]">
                  Ditolak
                </p>
              </div>
            </div>

          </div>

          {/* LOWER CONTENT */}
          <div className="mt-[12px] grid grid-cols-[1.65fr_0.95fr] gap-[20px]">

            {/* DATA LAPORAN */}
            <div>

              <div className="mb-[12px] flex items-center justify-between">
                <h2 className="text-[22px] font-bold text-[#14294A]">
                  Data Laporan
                </h2>
              </div>

              <div className="rounded-[10px] border border-[#C9D0D8] bg-white px-[6px]">

                <div className="flex h-[42px] items-center justify-between border-b border-[#D9DEE5] px-[10px]">
                  <span className="text-[14px] font-bold text-[#14294A]">
                    Terbaru
                  </span>

                  <button
                    type="button"
                    onClick={onDataLaporan}
                    className="flex items-center gap-2 text-[11px] font-medium text-[#00A97B]"
                  >
                    Lihat Semua
                    <span className="text-[19px] leading-none">
                      →
                    </span>
                  </button>
                </div>

                {/* ROW 1 */}
                <div
                  onClick={onOpenDetail}
                  className="flex h-[66px] cursor-pointer items-center border-b border-[#D9DEE5] px-[10px]"
                >
                  <div className="h-[40px] w-[40px] overflow-hidden rounded-[5px] bg-[#E5E7EB]">
                    <img
                      src="/file.svg"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-[10px] flex-1">
                    <p className="text-[14px] font-bold text-[#14294A]">
                      Jalan Rusak
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      📍 Jl. Anggrek, RT 01/RW 01
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      🗓 10 Sep 26 10:30
                    </p>
                  </div>

                  <span className="mr-[65px] rounded-full bg-[#B9E4D8] px-[22px] py-[4px] text-[10px] font-medium text-[#087F60]">
                    Diproses
                  </span>

                  <span className="text-[20px] text-[#14294A]">
                    ›
                  </span>
                </div>

                {/* ROW 2 */}
                <div
                  onClick={onOpenDetail}
                  className="flex h-[66px] cursor-pointer items-center border-b border-[#D9DEE5] px-[10px]"
                >
                  <div className="h-[40px] w-[40px] overflow-hidden rounded-[5px] bg-[#E5E7EB]">
                    <img
                      src="/file.svg"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-[10px] flex-1">
                    <p className="text-[14px] font-bold text-[#14294A]">
                      Sampah Menumpuk
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      📍 Jl. Melati, RT 01/RW 01
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      🗓 8 Sep 26 15:30
                    </p>
                  </div>

                  <span className="mr-[65px] rounded-full bg-[#B9E4D8] px-[22px] py-[4px] text-[10px] font-medium text-[#087F60]">
                    Diproses
                  </span>

                  <span className="text-[20px] text-[#14294A]">
                    ›
                  </span>
                </div>

                {/* ROW 3 */}
                <div
                  onClick={onOpenDetail}
                  className="flex h-[66px] cursor-pointer items-center border-b border-[#D9DEE5] px-[10px]"
                >
                  <div className="h-[40px] w-[40px] overflow-hidden rounded-[5px] bg-[#E5E7EB]">
                    <img
                      src="/file.svg"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-[10px] flex-1">
                    <p className="text-[14px] font-bold text-[#14294A]">
                      Lampu Jalan Mati
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      📍 Jl. Danau, RT 02/RW 01
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      🗓 3 Sep 26 10:50
                    </p>
                  </div>

                  <span className="mr-[65px] rounded-full bg-[#B9E4D8] px-[25px] py-[4px] text-[10px] font-medium text-[#087F60]">
                    Selesai
                  </span>

                  <span className="text-[20px] text-[#14294A]">
                    ›
                  </span>
                </div>

                {/* ROW 4 */}
                <div
                  onClick={onOpenDetail}
                  className="flex h-[66px] cursor-pointer items-center px-[10px]"
                >
                  <div className="h-[40px] w-[40px] overflow-hidden rounded-[5px] bg-[#E5E7EB]">
                    <img
                      src="/file.svg"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-[10px] flex-1">
                    <p className="text-[14px] font-bold text-[#14294A]">
                      Saluran Air Tersumbat
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      📍 Jl. Mekar, RT 02/RW 01
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      🗓 2 Sep 26 10:45
                    </p>
                  </div>

                  <span className="mr-[65px] rounded-full bg-[#B9E4D8] px-[25px] py-[4px] text-[10px] font-medium text-[#087F60]">
                    Selesai
                  </span>

                  <span className="text-[20px] text-[#14294A]">
                    ›
                  </span>
                </div>

              </div>

            </div>

            {/* RINGKASAN */}
            <div className="mt-[22px] rounded-[10px] border border-[#C9D0D8] bg-white p-[16px]">

              <div className="flex items-center justify-between">

                <h3 className="text-[14px] font-bold text-[#14294A]">
                  Ringkasan Laporan
                </h3>

                <div className="relative">

                  <button
                    type="button"
                    onClick={() => setRingkasanOpen((prev) => !prev)}
                    className="flex h-[26px] items-center gap-2 rounded-[4px] border border-[#E1E7ED] bg-white px-[9px] text-[9px] text-[#475569] hover:bg-[#F8FAFC]"
                  >
                    {filterHari}
                    <span>⌄</span>
                  </button>

                  {ringkasanOpen && (
                    <div className="absolute right-0 top-[30px] z-[9999] w-[135px] rounded-[5px] border border-[#E1E7ED] bg-white py-1 shadow-lg">

                      {[
                        "7 hari terakhir",
                        "14 hari terakhir",
                        "30 hari terakhir",
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setFilterHari(option);
                            setRingkasanOpen(false);
                          }}
                          className="block w-full px-3 py-2 text-left text-[8px] text-[#475569] hover:bg-[#EAF5F2] hover:text-[#00A97B]"
                        >
                          {option}
                        </button>
                      ))}

                    </div>
                  )}

                </div>

              </div>

              {/* DONUT */}
              <div className="mt-[10px] rounded-[8px] border border-[#E1E7ED] p-[12px]">

                <div className="flex items-center justify-center gap-[15px]">

                  <div className="relative h-[125px] w-[125px]">

                    <div
                      className="h-full w-full rounded-full p-[24px]"
                      style={{
                        background:
                          "conic-gradient(#38BDF8 0deg 154deg, #00D084 154deg 205deg, #F59E0B 205deg 308deg, #D946EF 308deg 360deg)",
                      }}
                    >

                      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">

                        <span className="text-[8px] text-[#64748B]">
                          Total Laporan
                        </span>

                        <span className="text-[20px] font-bold text-[#14294A]">
                          14
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="space-y-[10px]">

                    <div className="flex items-center gap-[7px]">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#38BDF8]" />
                      <span className="w-[72px] text-[9px] text-[#475569]">
                        Infrastruktur
                      </span>
                      <span className="text-[9px] font-semibold text-[#14294A]">
                        6
                      </span>
                    </div>

                    <div className="flex items-center gap-[7px]">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#00D084]" />
                      <span className="w-[72px] text-[9px] text-[#475569]">
                        Kebersihan
                      </span>
                      <span className="text-[9px] font-semibold text-[#14294A]">
                        2
                      </span>
                    </div>

                    <div className="flex items-center gap-[7px]">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#F59E0B]" />
                      <span className="w-[72px] text-[9px] text-[#475569]">
                        Keamanan
                      </span>
                      <span className="text-[9px] font-semibold text-[#14294A]">
                        4
                      </span>
                    </div>

                    <div className="flex items-center gap-[7px]">
                      <span className="h-[10px] w-[10px] rounded-full bg-[#D946EF]" />
                      <span className="w-[72px] text-[9px] text-[#475569]">
                        Lainnya
                      </span>
                      <span className="text-[9px] font-semibold text-[#14294A]">
                        2
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* TREN */}
              <div className="mt-[20px]">

                <h3 className="mb-[10px] text-[14px] font-bold text-[#14294A]">
                  Tren Laporan
                </h3>

                <div className="rounded-[8px] border border-[#E1E7ED] p-[10px]">

                  <div className="mb-[7px] flex justify-end">

                    <div className="relative">

                      <button
                        type="button"
                        onClick={() => setFilterOpen((prev) => !prev)}
                        className="
                          flex
                          h-[24px]
                          items-center
                          gap-2
                          rounded-[4px]
                          border
                          border-[#E1E7ED]
                          bg-white
                          px-[7px]
                          text-[8px]
                          text-[#475569]
                          hover:bg-[#F8FAFC]
                        "
                      >
                        {filterHari}
                        <span>⌄</span>
                      </button>

                      {filterOpen && (
                        <div
                          className="
                            absolute
                            right-0
                            top-[28px]
                            z-[9999]
                            w-[135px]
                            rounded-[5px]
                            border
                            border-[#E1E7ED]
                            bg-white
                            py-1
                            shadow-lg
                          "
                        >

                          <button
                            type="button"
                            onClick={() => {
                              setFilterHari("7 hari terakhir");
                              setFilterOpen(false);
                            }}
                            className="
                              block
                              w-full
                              px-3
                              py-2
                              text-left
                              text-[8px]
                              text-[#475569]
                              hover:bg-[#EAF5F2]
                              hover:text-[#00A97B]
                            "
                          >
                            7 hari terakhir
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setFilterHari("14 hari terakhir");
                              setFilterOpen(false);
                            }}
                            className="
                              block
                              w-full
                              px-3
                              py-2
                              text-left
                              text-[8px]
                              text-[#475569]
                              hover:bg-[#EAF5F2]
                              hover:text-[#00A97B]
                            "
                          >
                            14 hari terakhir
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setFilterHari("30 hari terakhir");
                              setFilterOpen(false);
                            }}
                            className="
                              block
                              w-full
                              px-3
                              py-2
                              text-left
                              text-[8px]
                              text-[#475569]
                              hover:bg-[#EAF5F2]
                              hover:text-[#00A97B]
                            "
                          >
                            30 hari terakhir
                          </button>

                        </div>
                      )}

                    </div>

                  </div>

                  <div className="relative h-[94px]">

                    <div className="absolute inset-x-0 top-[8px] border-t border-[#DCE3EA]" />
                    <div className="absolute inset-x-0 top-[30px] border-t border-[#DCE3EA]" />
                    <div className="absolute inset-x-0 top-[52px] border-t border-[#DCE3EA]" />
                    <div className="absolute inset-x-0 top-[74px] border-t border-[#DCE3EA]" />

                    <div className="absolute left-0 top-[2px] text-[6px] text-[#94A3B8]">
                      15
                    </div>

                    <div className="absolute left-0 top-[24px] text-[6px] text-[#94A3B8]">
                      10
                    </div>

                    <div className="absolute left-0 top-[46px] text-[6px] text-[#94A3B8]">
                      5
                    </div>

                    <div className="absolute left-0 top-[68px] text-[6px] text-[#94A3B8]">
                      0
                    </div>

                    <svg
                      className="absolute left-[24px] top-[7px]"
                      width="235"
                      height="78"
                      viewBox="0 0 235 78"
                      fill="none"
                    >
                      <polyline
                        points="5,45 42,35 77,58 112,42 148,16 183,32 217,26 231,49"
                        stroke="#00B686"
                        strokeWidth="2"
                        fill="none"
                      />

                      <circle
                        cx="5"
                        cy="45"
                        r="2.7"
                        fill="#00B686"
                      />
                      <circle
                        cx="42"
                        cy="35"
                        r="2.7"
                        fill="#00B686"
                      />
                      <circle
                        cx="77"
                        cy="58"
                        r="2.7"
                        fill="#00B686"
                      />
                      <circle
                        cx="112"
                        cy="42"
                        r="2.7"
                        fill="#00B686"
                      />
                      <circle
                        cx="148"
                        cy="16"
                        r="2.7"
                        fill="#00B686"
                      />
                      <circle
                        cx="183"
                        cy="32"
                        r="2.7"
                        fill="#00B686"
                      />
                      <circle
                        cx="217"
                        cy="26"
                        r="2.7"
                        fill="#00B686"
                      />
                      <circle
                        cx="231"
                        cy="49"
                        r="2.7"
                        fill="#00B686"
                      />
                    </svg>

                    <div className="absolute bottom-0 left-[25px] right-0 flex justify-between text-[6px] text-[#94A3B8]">
                      <span>1 Sep</span>
                      <span>2 Sep</span>
                      <span>3 Sep</span>
                      <span>4 Sep</span>
                      <span>5 Sep</span>
                      <span>6 Sep</span>
                      <span>7 Sep</span>
                      <span>8 Sep</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
  );
}