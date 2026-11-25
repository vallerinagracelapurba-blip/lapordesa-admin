"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Gagal Memuat Halaman
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Terjadi kesalahan saat membuka halaman dashboard.
          Silakan coba lagi.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-3 break-words text-xs text-red-600">
            {error.message}
          </p>
        )}

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}