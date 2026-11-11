"use client";
import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    try {
      await login({ email, password });
      router.replace("/dashboard");
      router.refresh();
    } catch (error) { setError(error instanceof Error ? error.message : "Tidak dapat terhubung ke server."); }
    finally { setLoading(false); }
  }
  return { email, setEmail, password, setPassword, error, setError, loading, handleLogin };
}
