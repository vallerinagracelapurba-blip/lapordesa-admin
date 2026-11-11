
"use client";

import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { email, setEmail, password, setPassword, error, setError, loading, handleLogin } = useLogin();
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="relative flex min-h-screen w-full overflow-hidden">
        <section className="relative w-1/2 border-r border-[#D9DEE5]">
          <img
            src="/login-logo.png"
            alt="LaporDesa"
            className="absolute left-[9%] top-[18%] z-30 w-[48%] max-w-[430px] object-contain"
          />

          <img
            src="/login-tagline.png"
            alt="Lingkungan Lebih Baik, Dimulai dari Kita"
            className="absolute left-[39%] top-[40%] z-30 w-[25%] max-w-[220px] object-contain"
          />

          <img
            src="/login-illustration.png"
            alt="Ilustrasi lingkungan LaporDesa"
            className="absolute bottom-0 left-0 z-10 w-full object-contain object-bottom"
          />
        </section>

        <section className="flex w-1/2 items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="w-[360px] rounded-lg border border-[#D9E0E8] bg-white px-8 py-10"
          >
            <div className="mb-7 text-center">
              <h1 className="text-[22px] font-bold text-[#111827]">
                Login
              </h1>

              <p className="mt-1 text-[18px] font-bold">
                <span className="text-[#14294A]">Lapor</span>
                <span className="text-[#00B686]">Desa</span>
              </p>
            </div>

            <div className="mb-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                  ✉
                </span>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  autoComplete="username"
                  required
                  className="h-12 w-full rounded-md border border-[#D9E0E8] bg-white pl-11 pr-3 text-sm text-[#334155] outline-none placeholder:text-[#A8B3C2] focus:border-[#00B686] focus:ring-2 focus:ring-[#00B686]/10"
                />
              </div>
            </div>

            <div className="mb-2">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                  ♙
                </span>

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="h-12 w-full rounded-md border border-[#D9E0E8] bg-white pl-11 pr-3 text-sm text-[#334155] outline-none placeholder:text-[#A8B3C2] focus:border-[#00B686] focus:ring-2 focus:ring-[#00B686]/10"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mb-4 mt-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <div className="mb-9 mt-3 text-right">
              <button
                type="button"
                onClick={() =>
                  setError("Silakan hubungi administrator untuk bantuan reset password.")
                }
                className="text-[10px] font-medium text-[#00B686] hover:underline"
              >
                Lupa Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-md bg-[#08B884] text-sm font-bold text-white transition hover:bg-[#079F73] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Memeriksa..." : "Masuk"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
