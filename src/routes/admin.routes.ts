import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { getMe } from "../controllers/admin/admin.controller";

const router = Router();


router.get("/me", authMiddleware, roleMiddleware(1), getMe);


export default router;