
import { Router } from "express";
import {
  getWarga,
  getWargaDetail,
  postWarga,
  deleteWargaById,
} from "../controllers/wargaController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", getWarga);
router.post("/", postWarga);
router.delete("/:id", deleteWargaById);
router.get("/:id", getWargaDetail);

export default router;
