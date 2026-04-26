import { Request, Response, NextFunction } from "express";
import { registerUserService } from "../../services/auth/register.service";
import { loginUserService, logoutUserService, refreshTokenService } from "../../services/auth/login.service";
import AppError from "../../utils/AppError";
import { refreshTokenCookieOptions } from "../../utils/cookieOptions";


export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const result = await loginUserService(req.body);

        res.cookie(
            "refreshToken",
            result.refreshToken,
            refreshTokenCookieOptions
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: result.user,
                accessToken: result.accessToken,
            },
            errors: null,
        });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken;

        const result = await refreshTokenService(incomingRefreshToken);

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
        const incomingRefreshToken = req.cookies?.refreshToken;

        await logoutUserService(incomingRefreshToken);

        res.clearCookie("refreshToken", refreshTokenCookieOptions);

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
