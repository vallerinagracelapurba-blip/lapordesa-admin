# LaporDesa Frontend

Jalankan `npm install` lalu `npm run dev`. Backend berjalan terpisah.
Salin `.env.example` ke `.env.local` lalu isi `SESSION_SECRET` dengan nilai acak minimal 32 karakter. Jangan commit secret. `NEXT_PUBLIC_API_URL` mengarah ke backend (default `http://localhost:5000/api`). Restart server setelah mengubah environment.

## Struktur

- `app/(auth)/login`: route login dan komponen tampilannya.
- `app/(dashboard)`: dashboard, laporan, warga, pengaturan; setiap halaman memiliki `page.tsx` dan `components/` sendiri.
- `app/(dashboard)/laporan/detail`: detail laporan dengan URL tetap. ID laporan yang dipilih disimpan di sessionStorage tab browser agar tetap tersedia ketika refresh. Buka dari daftar laporan untuk memilih data.
- `app/(dashboard)/warga/detail`: detail warga dengan data contoh seperti sebelumnya.
- `app/(dashboard)/pengaturan/profil`: ubah profil.
- `app/api/auth`: handler login/logout pada server frontend.
- `components/layout`: UI bersama.
- `hooks`: logika login dan navigasi.
- `services`: komunikasi API.
- `lib`: konfigurasi, sesi server, validasi redirect.
- `types`: tipe domain dan autentikasi.
- `public`: aset statis. CSS global tetap di `app/globals.css` karena memakai Tailwind.

Route group tidak mengubah URL: `app/(dashboard)/laporan/page.tsx` tetap `/laporan`. File `page.tsx` hanya merender komponen halaman.

## Proteksi login

Next.js 16 memakai `proxy.ts` sebagai pengganti nama `middleware.ts`. Proxy memverifikasi tanda tangan dan masa berlaku cookie sebelum membuka route dashboard. Layout dashboard juga memeriksa sesi di server. Setelah login berhasil dari backend, handler frontend membuat cookie HttpOnly, SameSite=Lax, Secure pada production, berlaku 8 jam. Logout menghapus cookie. Pengunjung tanpa sesi diarahkan ke `/login`. Setelah login berhasil, pengguna langsung masuk `/dashboard`, tanpa query parameter.

Proteksi ini membatasi halaman frontend. Otorisasi endpoint backend tetap perlu diterapkan terpisah di backend; API data mempertahankan kontrak yang ada. Tambah warga, detail warga dan penyimpanan profil masih memiliki keterbatasan implementasi sebelumnya.

Validasi: `npm run lint`, `npx tsc --noEmit`, `npm run build`.
