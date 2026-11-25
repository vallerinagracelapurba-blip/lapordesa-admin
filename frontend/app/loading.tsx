export default function Loading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-gray-50"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        <p className="text-sm text-gray-600">
          Memuat halaman LaporDesa...
        </p>
      </div>
    </main>
  );
}