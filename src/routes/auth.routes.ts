import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator";
import validateRequest from "../middleware/validate.middleware";
import { register } from "../controllers/auth/register.controller";
import { login } from "../controllers/auth/login.controller";

const router = Router();

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);


export default router;