import express from "express";
const router = express.Router();
import { login, signup, logout, me } from "../controllers/authController.js";
import { authentication } from "../middleware/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authentication, me);
export default router;
