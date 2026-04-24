import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { verifyAccessToken } from "../utils/auth/verifyToken";
import User from "../models/user.model";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Authorization header is missing", 401);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError("Invalid authorization format", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError("Access token is required", 401);
    }

    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      throw new AppError("Session expired. Please login again.", 401);
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
      tokenVersion: decoded.tokenVersion,
    };

    next();
  } catch (error) {
    next(error);
  }
};