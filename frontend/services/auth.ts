import type { LoginCredentials, LoginResponse } from "@/types/auth";
export async function login(credentials: LoginCredentials): Promise<void> {
  const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) });
  const result: LoginResponse = await response.json();
  if (!response.ok || !result.success) throw new Error(result.message || "Login gagal.");
}
export async function logout(): Promise<void> {
  const response = await fetch("/api/auth/logout", { method: "POST" });
  if (!response.ok) throw new Error("Gagal keluar.");
}
