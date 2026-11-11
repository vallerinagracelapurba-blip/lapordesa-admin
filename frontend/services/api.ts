import { API_BASE_URL, BACKEND_URL } from "@/lib/config";
export function apiFetch(path: string, options?: RequestInit) { return fetch(`${API_BASE_URL}${path}`, options); }
export function assetUrl(path: string) { return `${BACKEND_URL}/${path.replace(/^\/+/, "")}`; }
