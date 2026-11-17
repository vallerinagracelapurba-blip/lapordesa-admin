
import express from "express";
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
app.use(express.json());

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

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/laporan", laporanRoutes);
app.use("/api/warga", wargaRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/search", searchRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan.",
  });
});

export default app;
