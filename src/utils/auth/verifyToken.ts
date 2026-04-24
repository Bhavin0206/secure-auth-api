import jwt from "jsonwebtoken";
import AppError from "../AppError";
 

export interface TokenPayload {
  id: string;
  role: number;
  tokenVersion: number;
}

export const verifyRefreshToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET as string
        ) as TokenPayload;
    } catch (error) {
        throw new AppError("Invalid or expired refresh token", 401);
    }
};

export const verifyAccessToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET as string
        ) as TokenPayload;
    } catch (error) {
        throw new AppError("Invalid or expired access token", 401);
    }
};