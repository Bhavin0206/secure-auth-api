import { Request, Response, NextFunction } from "express";
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