
"use client";

import { useMemo, useState } from "react";
import {
  CheckIcon,
  ClockIcon,
  DocumentIcon,
  XIcon,
} from "@/components/layout/DashboardIcons";

import type { DashboardStats } from "@/types/domain";
import type {
  DashboardRecentReport,
  DashboardCategory,
  DashboardTrend,
} from "./DashboardPage";

type DashboardOverviewProps = {
  stats: DashboardStats;
  recentReports: DashboardRecentReport[];
  categorySummary: DashboardCategory[];
  trend: DashboardTrend[];
  summaryDays: number;
  trendDays: number;
  onSummaryDaysChange: (days: number) => void;
  onTrendDaysChange: (days: number) => void;
  onOpenDetail: (id: string | number) => void;
  onDataLaporan: () => void;
};

const chartColors = [
  "#38BDF8",
  "#00D084",
  "#F59E0B",
  "#D946EF",
  "#6366F1",
  "#F97316",
  "#14B8A6",
];

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  }).format(date);
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function getStatusStyle(status: string) {
  switch (status) {
    case "Diproses":
      return "bg-[#DDEFEA] text-[#087F60]";
    case "Selesai":
      return "bg-[#B9E4D8] text-[#087F60]";
    case "Ditolak":
      return "bg-[#FEE2E2] text-[#DC2626]";
    case "Menunggu":
    default:
      return "bg-[#FEF3C7] text-[#B45309]";
  }
}

function PeriodDropdown({
  value,
  onChange,
}: {
  value: number;
  onChange: (days: number) => void;
}) {
  const [open, setOpen] = useState(false);

  const options = [7, 14, 30];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-[26px] items-center gap-2 rounded-[4px] border border-[#E1E7ED] bg-white px-[9px] text-[9px] text-[#475569] hover:bg-[#F8FAFC]"
      >
        {value} hari terakhir
        <span>⌄</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[30px] z-[9999] w-[135px] rounded-[5px] border border-[#E1E7ED] bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-[8px] text-[#475569] hover:bg-[#EAF5F2] hover:text-[#00A97B]"
            >
              {option} hari terakhir
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardOverview({
  stats,
  recentReports,
  categorySummary,
  trend,
  summaryDays,
  trendDays,
  onSummaryDaysChange,
  onTrendDaysChange,
  onOpenDetail,
  onDataLaporan,
}: DashboardOverviewProps) {
  const totalKategori = categorySummary.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const donutBackground = useMemo(() => {
    if (totalKategori === 0) {
      return "#E5E7EB";
    }

    let currentDegree = 0;

    const segments = categorySummary.map((item, index) => {
      const degree = (Number(item.total) / totalKategori) * 360;
      const start = currentDegree;
      currentDegree += degree;

      return `${chartColors[index % chartColors.length]} ${start}deg ${currentDegree}deg`;
    });

    return `conic-gradient(${segments.join(", ")})`;
  }, [categorySummary, totalKategori]);

  const chartData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dataMap = new Map(
      trend.map((item) => [item.tanggal, Number(item.total) || 0])
    );

    return Array.from({ length: trendDays }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (trendDays - 1 - index));

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const key = `${year}-${month}-${day}`;

      return {
        tanggal: key,
        total: dataMap.get(key) ?? 0,
        label: new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "short",
        }).format(date),
      };
    });
  }, [trend, trendDays]);

  const maxTrend = Math.max(
    1,
    ...chartData.map((item) => item.total)
  );

  const chartPoints = chartData.map((item, index) => {
    const x =
      chartData.length <= 1
        ? 118
        : 5 + (index / (chartData.length - 1)) * 226;

    const y = 72 - (item.total / maxTrend) * 62;

    return {
      x,
      y,
      total: item.total,
      label: item.label,
    };
  });

  const polylinePoints = chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const labelIndexes = Array.from(
    new Set([
      0,
      Math.floor((chartData.length - 1) / 3),
      Math.floor(((chartData.length - 1) * 2) / 3),
      chartData.length - 1,
    ])
  );

  const yAxisLabels = [
    maxTrend,
    Math.ceil((maxTrend * 2) / 3),
    Math.ceil(maxTrend / 3),
    0,
  ];

  return (
    <div className="px-[34px] pb-[35px] pt-[36px]">
      {/* TITLE */}
      <div className="mb-[24px]">
        <h1 className="text-[25px] font-bold leading-tight text-[#14294A]">
          Selamat Datang, PengelolaRT 01
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
                <span className="text-[19px] leading-none">→</span>
              </button>
            </div>

            {recentReports.length > 0 ? (
              recentReports.map((report, index) => (
                <div
                  key={report.id}
                  onClick={() => onOpenDetail(report.id)}
                  className={`flex h-[66px] cursor-pointer items-center px-[10px] ${
                    index !== recentReports.length - 1
                      ? "border-b border-[#D9DEE5]"
                      : ""
                  }`}
                >
                  <div className="h-[40px] w-[40px] overflow-hidden rounded-[5px] bg-[#E5E7EB]">
                    <img
                      src="/file.svg"
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-[10px] min-w-0 flex-1">
                    <p className="truncate text-[14px] font-bold text-[#14294A]">
                      {report.judul}
                    </p>

                    <p className="truncate text-[9px] text-[#334155]">
                      📍 {report.alamat_lokasi}
                    </p>

                    <p className="text-[9px] text-[#334155]">
                      🗓 {formatDate(report.created_at)}{" "}
                      {formatTime(report.created_at)}
                    </p>
                  </div>

                  <span
                    className={`mr-[20px] whitespace-nowrap rounded-full px-[12px] py-[4px] text-[10px] font-medium ${getStatusStyle(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>

                  <span className="text-[20px] text-[#14294A]">›</span>
                </div>
              ))
            ) : (
              <div className="flex h-[120px] items-center justify-center text-[12px] text-[#94A3B8]">
                Belum ada laporan.
              </div>
            )}
          </div>
        </div>

        {/* RINGKASAN */}
        <div className="mt-[22px] rounded-[10px] border border-[#C9D0D8] bg-white p-[16px]">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-[#14294A]">
              Ringkasan Laporan
            </h3>

            <PeriodDropdown
              value={summaryDays}
              onChange={onSummaryDaysChange}
            />
          </div>

          {/* DONUT */}
          <div className="mt-[10px] rounded-[8px] border border-[#E1E7ED] p-[12px]">
            <div className="flex items-center justify-center gap-[15px]">
              <div className="relative h-[125px] w-[125px] shrink-0">
                <div
                  className="h-full w-full rounded-full p-[24px]"
                  style={{ background: donutBackground }}
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-[8px] text-[#64748B]">
                      Total Laporan
                    </span>

                    <span className="text-[20px] font-bold text-[#14294A]">
                      {totalKategori}
                    </span>
                  </div>
                </div>
              </div>

              <div className="min-w-0 space-y-[10px]">
                {categorySummary.length > 0 ? (
                  categorySummary.map((item, index) => (
                    <div
                      key={item.nama_kategori}
                      className="flex items-center gap-[7px]"
                    >
                      <span
                        className="h-[10px] w-[10px] shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            chartColors[index % chartColors.length],
                        }}
                      />

                      <span className="w-[72px] truncate text-[9px] text-[#475569]">
                        {item.nama_kategori}
                      </span>

                      <span className="text-[9px] font-semibold text-[#14294A]">
                        {item.total}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[9px] text-[#94A3B8]">
                    Belum ada data kategori.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* TREN */}
          <div className="mt-[20px]">
            <div className="mb-[10px] flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#14294A]">
                Tren Laporan
              </h3>

              <PeriodDropdown
                value={trendDays}
                onChange={onTrendDaysChange}
              />
            </div>

            <div className="rounded-[8px] border border-[#E1E7ED] p-[10px]">
              <div className="relative h-[94px]">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="absolute inset-x-0 border-t border-[#DCE3EA]"
                    style={{ top: `${8 + index * 22}px` }}
                  />
                ))}

                {yAxisLabels.map((label, index) => (
                  <div
                    key={index}
                    className="absolute left-0 text-[6px] text-[#94A3B8]"
                    style={{ top: `${2 + index * 22}px` }}
                  >
                    {label}
                  </div>
                ))}

                <svg
                  className="absolute left-[24px] top-[7px]"
                  width="235"
                  height="78"
                  viewBox="0 0 235 78"
                  fill="none"
                >
                  {chartPoints.length > 1 && (
                    <polyline
                      points={polylinePoints}
                      stroke="#00B686"
                      strokeWidth="2"
                      fill="none"
                    />
                  )}

                  {chartPoints.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="2.7"
                      fill="#00B686"
                    />
                  ))}
                </svg>

                <div className="absolute bottom-0 left-[25px] right-0 flex justify-between text-[6px] text-[#94A3B8]">
                  {labelIndexes.map((index) => (
                    <span key={index}>
                      {chartData[index]?.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
