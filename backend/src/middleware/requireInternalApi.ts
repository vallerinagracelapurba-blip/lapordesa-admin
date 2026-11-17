
import type { Request, Response, NextFunction } from "express";
import { timingSafeEqual } from "node:crypto";

export function requireInternalApi(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const expected = process.env.INTERNAL_API_SECRET;
  const provided = req.header("x-internal-api-secret");

  if (!expected || !provided) {
    res.status(403).json({
      success: false,
      message: "Akses API tidak diizinkan.",
    });
    return;
  }

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    res.status(403).json({
      success: false,
      message: "Akses API tidak diizinkan.",
    });
    return;
  }

  next();
}
