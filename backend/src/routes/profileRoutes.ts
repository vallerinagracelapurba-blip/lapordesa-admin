
import { Router } from "express";

import {
  getProfileController,
  updateProfileController,
} from "../controllers/profileController.js";

import {
  changePasswordController,
} from "../controllers/passwordController.js";

import {
  requireInternalApi,
} from "../middleware/requireInternalApi.js";

const router = Router();

// Proteksi seluruh endpoint profil
router.use(requireInternalApi);

// Endpoint ubah kata sandi
router.post("/change-password/:id", changePasswordController);

// Endpoint ambil profil
router.get("/:id", getProfileController);

// Endpoint ubah profil
router.put("/:id", updateProfileController);

export default router;
