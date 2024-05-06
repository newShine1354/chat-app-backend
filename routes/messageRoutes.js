import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import { authentication } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/send/:id", authentication, sendMessage);

// Authentication flow.
router.get("/:id", authentication, getMessages);

export default router;
