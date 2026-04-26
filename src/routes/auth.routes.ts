import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator";
import validateRequest from "../middleware/validate.middleware";
import { register } from "../controllers/auth/register.controller";
import { login, logout, refreshToken } from "../controllers/auth/login.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authRateLimiter } from "../middleware/rateLimit.middleware";

const router = Router();


router.post("/register", authRateLimiter, registerValidator, validateRequest, register);
router.post("/login", authRateLimiter, loginValidator, validateRequest, login);
router.post("/refresh-token", authRateLimiter, refreshToken);
router.post("/logout", authRateLimiter, logout);




export default router;