
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
      `${API_BASE_URL}/notifications/${encodeURIComponent(String(userId))}`,
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

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Get notifications API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil notifikasi.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json(
        {
          success: false,
          message: "Permintaan tidak diizinkan.",
        },
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

    let backendUrl = "";

    if (body.action === "read-all") {
      backendUrl =
        `${API_BASE_URL}/notifications/` +
        `${encodeURIComponent(String(userId))}/read-all`;
    } else if (
      body.action === "read" &&
      Number.isInteger(Number(body.notificationId)) &&
      Number(body.notificationId) > 0
    ) {
      backendUrl =
        `${API_BASE_URL}/notifications/` +
        `${encodeURIComponent(String(userId))}/` +
        `${encodeURIComponent(String(body.notificationId))}/read`;
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Permintaan notifikasi tidak valid.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        "x-internal-api-secret":
          process.env.INTERNAL_API_SECRET ?? "",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Update notifications API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui notifikasi.",
      },
      { status: 500 }
    );
  }
}
