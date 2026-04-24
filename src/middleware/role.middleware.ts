import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";

export const roleMiddleware = (...allowedRoles: number[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            return next(new AppError("Unauthorized access", 401));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("Forbidden: You do not have permission", 403));
        }

        next();
    };
};