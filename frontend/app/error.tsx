"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">
          Terjadi Kesalahan
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Halaman tidak dapat ditampilkan. Silakan coba muat ulang halaman.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="mt-3 break-words text-xs text-red-600">
            {error.message}
          </p>
        )}

        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Coba Lagi
        </button>
      </div>
    </main>
  );
}