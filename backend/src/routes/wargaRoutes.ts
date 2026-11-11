
import { Router } from "express";
import {
  getWarga,
  getWargaDetail,
  postWarga,
  deleteWargaById,
} from "../controllers/wargaController.js";

const router = Router();

// GET semua warga
router.get("/", getWarga);

// POST tambah warga
router.post("/", postWarga);

// DELETE warga berdasarkan ID
router.delete("/:id", deleteWargaById);

// GET detail warga berdasarkan ID
router.get("/:id", getWargaDetail);

export default router;
