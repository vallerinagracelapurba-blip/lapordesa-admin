
import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/config";
import {
  getSessionUserId,
  SESSION_COOKIE,
} from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    // Validasi asal request
    if (request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json(
        {
          success: false,
          message: "Permintaan tidak diizinkan.",
        },
        { status: 403 }
      );
    }

    // Validasi sesi login
    const session = request.cookies.get(SESSION_COOKIE)?.value;
    const userId = getSessionUserId(session);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Sesi login tidak valid. Silakan login kembali.",
        },
        { status: 401 }
      );
    }

    // Ambil data dari form
    const body = await request.json();

    // Kirim request ke backend
    const response = await fetch(
      `${API_BASE_URL}/profile/change-password/${encodeURIComponent(
        String(userId)
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-api-secret":
            process.env.INTERNAL_API_SECRET ?? "",
        },
        body: JSON.stringify(body),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Change password API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui kata sandi.",
      },
      { status: 500 }
    );
  }
}
