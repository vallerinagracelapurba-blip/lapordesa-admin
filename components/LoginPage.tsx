"use client";

export default function LoginPage({
  onLogin,
}: {
  onLogin: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="relative flex min-h-screen w-full overflow-hidden">

        {/* =========================
            BAGIAN KIRI
        ========================== */}
        <section className="relative w-1/2 border-r border-[#D9DEE5]">

          {/* LOGO LAPORDESA */}
          <img
            src="/login-logo.png"
            alt="LaporDesa"
            className="
              absolute
              left-[9%]
              top-[18%]
              z-30
              w-[48%]
              max-w-[430px]
              object-contain
            "
          />

          {/* TAGLINE */}
          <img
            src="/login-tagline.png"
            alt="Lingkungan Lebih Baik, Dimulai dari Kita"
            className="
              absolute
              left-[39%]
              top-[40%]
              z-30
              w-[25%]
              max-w-[220px]
              object-contain
            "
          />

          {/* ILUSTRASI */}
          <img
            src="/login-illustration.png"
            alt="Ilustrasi lingkungan LaporDesa"
            className="
              absolute
              bottom-0
              left-0
              z-10
              w-full
              object-contain
              object-bottom
            "
          />
        </section>

        {/* =========================
            BAGIAN KANAN
        ========================== */}
        <section className="flex w-1/2 items-center justify-center">

          {/* LOGIN CARD */}
          <div
            className="
              w-[360px]
              rounded-lg
              border
              border-[#D9E0E8]
              bg-white
              px-8
              py-10
            "
          >

            {/* JUDUL */}
            <div className="mb-7 text-center">

              <h1 className="text-[22px] font-bold text-[#111827]">
                Login
              </h1>

              <p className="mt-1 text-[18px] font-bold">
                <span className="text-[#14294A]">
                  Lapor
                </span>

                <span className="text-[#00B686]">
                  Desa
                </span>
              </p>

            </div>

            {/* EMAIL / NO HP */}
            <div className="mb-4">
              <div className="relative">

                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#94A3B8]
                  "
                >
                  ✉
                </span>

                <input
                  type="text"
                  placeholder="Email/No. HP"
                  className="
                    h-12
                    w-full
                    rounded-md
                    border
                    border-[#D9E0E8]
                    bg-white
                    pl-11
                    pr-3
                    text-sm
                    text-[#334155]
                    outline-none
                    placeholder:text-[#A8B3C2]
                    focus:border-[#00B686]
                    focus:ring-2
                    focus:ring-[#00B686]/10
                  "
                />

              </div>
            </div>

            {/* PASSWORD */}
            <div className="mb-2">
              <div className="relative">

                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#94A3B8]
                  "
                >
                  ♙
                </span>

                <input
                  type="password"
                  placeholder="Password"
                  className="
                    h-12
                    w-full
                    rounded-md
                    border
                    border-[#D9E0E8]
                    bg-white
                    pl-11
                    pr-10
                    text-sm
                    text-[#334155]
                    outline-none
                    placeholder:text-[#A8B3C2]
                    focus:border-[#00B686]
                    focus:ring-2
                    focus:ring-[#00B686]/10
                  "
                />

                <span
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#94A3B8]
                  "
                >
                  ◉
                </span>

              </div>
            </div>

            {/* LUPA PASSWORD */}
            <div className="mb-9 text-right">
              <button
                type="button"
                className="
                  text-[10px]
                  font-medium
                  text-[#00B686]
                  hover:underline
                "
              >
                Lupa Password?
              </button>
            </div>

            {/* BUTTON MASUK */}
            <button
              type="button"
              onClick={onLogin}
              className="
                h-12
                w-full
                rounded-md
                bg-[#08B884]
                text-sm
                font-bold
                text-white
                transition
                hover:bg-[#079F73]
              "
            >
              Masuk
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}