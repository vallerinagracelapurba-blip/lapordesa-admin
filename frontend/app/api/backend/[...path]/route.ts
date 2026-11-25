
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSessionToken,
  SESSION_COOKIE,
} from "@/lib/session";
import { API_BASE_URL } from "@/lib/config";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function proxyRequest(
  request: NextRequest,
  context: RouteContext
) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
  const token = getSessionToken(sessionCookie);

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "Sesi login tidak valid atau sudah berakhir.",
      },
      { status: 401 }
    );
  }

  const { path } = await context.params;
  const endpoint = path.map(encodeURIComponent).join("/");
  const targetUrl = new URL(`${API_BASE_URL}/${endpoint}`);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  const accept = request.headers.get("accept");
  if (accept) headers.set("Accept", accept);

  try {
    const upstream = await fetch(targetUrl, {
      method: request.method,
      headers,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.arrayBuffer(),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    const responseHeaders = new Headers();
    const upstreamContentType = upstream.headers.get("content-type");

    if (upstreamContentType) {
      responseHeaders.set("Content-Type", upstreamContentType);
    }

    return new NextResponse(
      request.method === "HEAD" ? null : await upstream.arrayBuffer(),
      {
        status: upstream.status,
        headers: responseHeaders,
      }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Backend tidak dapat dihubungi.",
      },
      { status: 502 }
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const HEAD = proxyRequest;
