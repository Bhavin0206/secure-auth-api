import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { getMe } from "../controllers/admin/admin.controller";
import { changePassword } from "../controllers/auth/changePassword.controller";

const router = Router();


router.get("/me", authMiddleware, roleMiddleware(1), getMe);
router.post("/change-password", authMiddleware, roleMiddleware(1), changePassword);


export default router;