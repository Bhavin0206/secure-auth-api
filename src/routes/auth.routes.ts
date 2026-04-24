import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator";
import validateRequest from "../middleware/validate.middleware";
import { register } from "../controllers/auth/register.controller";
import { getMe, login, logout, refreshToken } from "../controllers/auth/login.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);



export default router;