
import { Router } from "express";
import {
  getWarga,
  getWargaDetail,
} from "../controllers/wargaController.js";

const router = Router();

// GET semua warga
router.get("/", getWarga);

// GET detail warga berdasarkan ID
router.get("/:id", getWargaDetail);

export default router;
