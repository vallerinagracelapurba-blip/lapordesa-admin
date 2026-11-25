
import { Router } from "express";
import {
  getLaporan,
  getLaporanDetail,
  updateStatusLaporan,
} from "../controllers/laporanController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", getLaporan);
router.patch("/:id/status", updateStatusLaporan);
router.get("/:id", getLaporanDetail);

export default router;
