
import { createHmac, timingSafeEqual } from "node:crypto";
import type { SessionPayload } from "@/types/auth";

export const SESSION_COOKIE = "lapordesa_session";
export const SESSION_MAX_AGE = 60 * 60 * 8;

function secret() {
  const value = process.env.SESSION_SECRET;

  if (!value || value.length < 32) {
    throw new Error("SESSION_SECRET harus berisi minimal 32 karakter.");
  }

  return value;
}

export function createSession(userId: string | number) {
  const session: SessionPayload = {
    userId,
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  };

  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");

  return `${payload}.${createHmac("sha256", secret())
    .update(payload)
    .digest("base64url")}`;
}

// Memvalidasi session dan mengambil ID pengguna
export function getSessionUserId(
  value?: string
): string | number | null {
  if (!value) return null;

  try {
    const parts = value.split(".");

    if (parts.length !== 2) return null;

    const [payload, signature] = parts;

    const expected = createHmac("sha256", secret())
      .update(payload)
      .digest();

    const actual = Buffer.from(signature, "base64url");

    if (
      actual.length !== expected.length ||
      !timingSafeEqual(actual, expected)
    ) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    ) as SessionPayload;

    if (
      (typeof session.userId !== "string" &&
        typeof session.userId !== "number") ||
      typeof session.expiresAt !== "number" ||
      session.expiresAt <= Date.now()
    ) {
      return null;
    }

    return session.userId;
  } catch {
    return null;
  }
}

// Memeriksa apakah session masih valid
export function verifySession(value?: string): boolean {
  return getSessionUserId(value) !== null;
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};
