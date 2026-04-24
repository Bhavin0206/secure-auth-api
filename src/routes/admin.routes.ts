import { Router } from "express";
import { getMe } from "../controllers/auth/login.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();


router.get("/me", authMiddleware, roleMiddleware(1), getMe);


export default router;