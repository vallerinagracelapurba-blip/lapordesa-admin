
import { BACKEND_URL } from "@/lib/config";

export function apiFetch(path: string, options?: RequestInit) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return fetch(`/api/backend${normalizedPath}`, options);
}

export function assetUrl(path: string) {
  return `${BACKEND_URL}/${path.replace(/^\/+/, "")}`;
}
