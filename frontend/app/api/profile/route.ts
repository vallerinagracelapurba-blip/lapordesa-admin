
import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/config";
import {
  getSessionUserId,
  SESSION_COOKIE,
} from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
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

    const response = await fetch(
      `${API_BASE_URL}/profile/${encodeURIComponent(String(userId))}`,
      {
        method: "GET",
        headers: {
          "x-internal-api-secret":
            process.env.INTERNAL_API_SECRET ?? "",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Get profile API error:", error);

    return NextResponse.json(
      { success: false, message: "Gagal mengambil data profil." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json(
        { success: false, message: "Permintaan tidak diizinkan." },
        { status: 403 }
      );
    }

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

    const body = await request.json();

    const response = await fetch(
      `${API_BASE_URL}/profile/${encodeURIComponent(String(userId))}`,
      {
        method: "PUT",
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

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error("Update profile API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan perubahan profil.",
      },
      { status: 500 }
    );
  }
}
