import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE, SESSION_MAX_AGE, sessionCookieOptions } from "@/lib/session";
import { API_BASE_URL } from "@/lib/config";
import type { LoginResponse } from "@/types/auth";
export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return NextResponse.json({ success: false }, { status: 403 });
  let credentials;
  try { credentials = await request.json(); } catch { return NextResponse.json({ success: false, message: "Data login tidak valid." }, { status: 400 }); }
  if (typeof credentials?.email !== "string" || typeof credentials?.password !== "string" || !credentials.email.trim() || !credentials.password) return NextResponse.json({ success: false, message: "Email dan password wajib diisi." }, { status: 400 });
  try {
    const upstream = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }), cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    const result: LoginResponse = await upstream.json();
    if (!upstream.ok || !result.success || result.data?.id == null) return NextResponse.json({ success: false, message: result.message || "Login gagal." }, { status: upstream.ok ? 401 : upstream.status });
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, createSession(result.data.id), { ...sessionCookieOptions, maxAge: SESSION_MAX_AGE });
    return response;
  } catch { return NextResponse.json({ success: false, message: "Login belum tersedia. Periksa koneksi backend dan konfigurasi sesi frontend." }, { status: 503 }); }
}
