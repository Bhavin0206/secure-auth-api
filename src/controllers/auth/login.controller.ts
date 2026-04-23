import { Request, Response, NextFunction } from "express";
import { registerUserService } from "../../services/auth/register.service";
import { loginUserService } from "../../services/auth/login.service";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await loginUserService(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
            errors: null,
        });

    } catch (error) {
        next(error);
    }


}