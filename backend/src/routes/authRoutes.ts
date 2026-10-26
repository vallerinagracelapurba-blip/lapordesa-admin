
import { Router } from "express";
import {
  getUserByEmailController,
  loginController,
} from "../controllers/authController.js";

const router = Router();

router.post("/login", loginController);
router.get("/user/:email", getUserByEmailController);

export default router;
