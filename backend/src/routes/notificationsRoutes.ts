
import { Router } from "express";
import {
  getNotifications,
  readNotification,
  readAllNotifications,
} from "../controllers/notificationsController.js";
import { requireInternalApi } from "../middleware/requireInternalApi.js";

const router = Router();

router.use(requireInternalApi);

router.get("/:userId", getNotifications);

router.patch("/:userId/read-all", readAllNotifications);

router.patch("/:userId/:notificationId/read", readNotification);

export default router;
