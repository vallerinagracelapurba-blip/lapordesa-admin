export type LoginCredentials = { email: string; password: string };
export type AuthUser = { id: string | number; nama: string; email: string; role: string };
export type LoginResponse = { success: boolean; message?: string; data?: AuthUser };

export type SessionPayload = { userId: string | number; expiresAt: number };
