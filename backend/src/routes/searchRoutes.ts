
import { Router } from "express";
import { searchAll } from "../controllers/searchController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.get("/", requireAuth, searchAll);

export default router;
