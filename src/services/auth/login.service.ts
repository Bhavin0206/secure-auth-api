import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import AppError from "../../utils/AppError";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/generateToken";
import { verifyRefreshToken } from "../../utils/auth/verifyToken";

interface LoginUserInput {
    email: string;
    password: string;
}

interface LoginUserResponse {
    user: {
        id: string;
        name: string;
        email: string;
        role: number;
    };
    accessToken: string;
    refreshToken: string;
}

interface RefreshTokenResponse {
    accessToken: string;
}

export const loginUserService = async (
    payload: LoginUserInput
): Promise<LoginUserResponse> => {
    const { email, password } = payload;

    const user = await User.findOne({ email }).select("+password +refreshToken");

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new AppError("Invalid email or password", 401);
    }

    const tokenPayload = {
        id: user._id.toString(),
        role: user.role,
        tokenVersion: user.tokenVersion,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    user.refreshToken = hashedRefreshToken;
    await user.save();

    return {
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
        accessToken,
        refreshToken,
    };
};

export const refreshTokenService = async (
    incomingRefreshToken: string
): Promise<RefreshTokenResponse> => {
    if (!incomingRefreshToken) {
        throw new AppError("Refresh token is required", 400);
    }

    const decoded = verifyRefreshToken(incomingRefreshToken);

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.refreshToken) {
        throw new AppError("No active session found. Please login again.", 401);
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
        throw new AppError("Session expired. Please login again.", 401);
    }

    const isRefreshTokenMatched = await bcrypt.compare(
        incomingRefreshToken,
        user.refreshToken
    );

    if (!isRefreshTokenMatched) {
        throw new AppError("Invalid refresh token", 401);
    }

    const accessToken = generateAccessToken({
        id: user._id.toString(),
        role: user.role,
        tokenVersion: user.tokenVersion,
    });

    return {
        accessToken,
    };
};

export const logoutUserService = async (
    incomingRefreshToken: string
): Promise<void> => {
    if (!incomingRefreshToken) {
        throw new AppError("Refresh token is required", 400);
    }

    const decoded = verifyRefreshToken(incomingRefreshToken);

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (!user.refreshToken) {
        throw new AppError("No active session found", 401);
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
        throw new AppError("Session expired. Please login again.", 401);
    }

    const isRefreshTokenMatched = await bcrypt.compare(
        incomingRefreshToken,
        user.refreshToken
    );

    if (!isRefreshTokenMatched) {
        throw new AppError("Invalid refresh token", 401);
    }

    user.refreshToken = null;

    // invalidate old access token immediately
    user.tokenVersion += 1;

    await user.save();
};