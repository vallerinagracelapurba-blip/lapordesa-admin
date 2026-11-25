
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Token autentikasi tidak ditemukan.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({
      success: false,
      message: "Konfigurasi autentikasi server belum tersedia.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || typeof decoded.id !== "number") {
      res.status(401).json({
        success: false,
        message: "Token autentikasi tidak valid.",
      });
      return;
    }

    req.user = {
      id: decoded.id,
      email: String(decoded.email ?? ""),
      role: String(decoded.role ?? ""),
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Token autentikasi tidak valid atau sudah kedaluwarsa.",
    });
  }
}
