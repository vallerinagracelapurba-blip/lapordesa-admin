
import { Router } from "express";
import {
  getLaporan,
  getLaporanDetail,
  updateStatusLaporan,
} from "../controllers/laporanController.js";

const router = Router();

// GET semua laporan
router.get("/", getLaporan);

// UPDATE status laporan
router.patch("/:id/status", updateStatusLaporan);

// GET detail laporan berdasarkan ID
router.get("/:id", getLaporanDetail);

export default router;
