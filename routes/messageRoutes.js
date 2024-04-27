import express from "express";
import { sendMessage, getMessages } from "../controllers/messageController.js";
import { authentication } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/send/:id", sendMessage);

// Authentication flow.
// router.get("/:id", getMessages);

// Flow without Authentication.
router.post("/", getMessages);

export default router;
