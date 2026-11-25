
import { Router } from "express";

import {
  getUserByEmailController,
  loginController,
} from "../controllers/authController.js";

import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

// Login tetap bisa diakses tanpa token
router.post("/login", loginController);

// Pencarian user wajib menggunakan JWT
router.get("/user/:email", requireAuth, getUserByEmailController);

export default router;
