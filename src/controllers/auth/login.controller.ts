import { Request, Response, NextFunction } from "express";
import { registerUserService } from "../../services/auth/register.service";
import { loginUserService, logoutUserService, refreshTokenService } from "../../services/auth/login.service";
import AppError from "../../utils/AppError";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
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

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        const result = await refreshTokenService(refreshToken);

        res.status(200).json({
            success: true,
            message: "New access token generated successfully",
            data: result,
            errors: null,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        await logoutUserService(refreshToken);

        res.status(200).json({
            success: true,
            message: "Logout successful",
            data: null,
            errors: null,
        });
    } catch (error) {
        next(error);
    }
};
export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: req.user,
            errors: null,
        });
    } catch (error) {
        next(error);
    }
};