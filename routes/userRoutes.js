import express from "express";
import { authentication } from "../middleware/authMiddleware.js";
import { getUserForSideBar } from "../controllers/userController.js";
const router = express.Router();
// router.get("/sidebar", authentication, getUserForSideBar);
router.get("/sidebar", authentication, getUserForSideBar);
// router.get("/:id", authentication, getMessages);

export default router;
