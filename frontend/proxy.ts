import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import { isProtectedPath } from "@/lib/navigation";

export function proxy(request: NextRequest) {
  const authenticated = verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  const { pathname } = request.nextUrl;

  if (!authenticated && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (authenticated && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/laporan/:path*", "/warga/:path*", "/pengaturan/:path*"],
};
