
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import laporanRoutes from "./routes/laporanRoutes.js";
import wargaRoutes from "./routes/wargaRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import notificationsRoutes from "./routes/notificationsRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend LaporDesa berhasil jalan!",
  });
});

app.get("/api/test-db", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");

    res.status(200).json({
      success: true,
      message: "Database berhasil terhubung!",
      data: rows,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database gagal terhubung!",
    });
  }
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/laporan", laporanRoutes);
app.use("/api/warga", wargaRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/search", searchRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan.",
  });
});

// Centralized error handler
app.use(
  (
    error: Error & { status?: number; type?: string },
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error("Server error:", error);

    if (res.headersSent) {
      return;
    }

    if (error.type === "entity.parse.failed") {
      res.status(400).json({
        success: false,
        message: "Format JSON request tidak valid.",
      });
      return;
    }

    if (error.type === "entity.too.large") {
      res.status(413).json({
        success: false,
        message: "Ukuran request terlalu besar.",
      });
      return;
    }

    const statusCode =
      error.status && error.status >= 400 && error.status < 600
        ? error.status
        : 500;

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Terjadi kesalahan pada server."
          : error.message || "Request tidak dapat diproses.",
    });
  }
);

export default app;
