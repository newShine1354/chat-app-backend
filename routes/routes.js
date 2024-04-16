import express from "express";
const router = express.Router();
import authRouter from "./authRoutes.js";
import messageRouter from "./messageRoutes.js";
import userRouter from "./userRoutes.js";


router.use("/auth", authRouter);
router.use("/message", messageRouter);
router.use("/user", userRouter);
export default router;
