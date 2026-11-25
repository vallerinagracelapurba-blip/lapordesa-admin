import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <p className="text-6xl font-bold text-blue-600">404</p>

        <h1 className="mt-4 text-xl font-semibold text-gray-900">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}