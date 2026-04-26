import { Request, Response, NextFunction } from "express";
import { changePasswordService } from "../../services/auth/changePassword.service";
import AppError from "../../utils/AppError";

export const changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            throw new AppError("Unauthorized", 401);
        }

        await changePasswordService(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Password changed successfully. Please login again.",
            data: null,
            errors: null,
        });
    } catch (error) {
        next(error);
    }
};