import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import AppError from "../../utils/AppError";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../../utils/generateToken";

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

    const accessToken = generateAccessToken({
        id: user._id.toString(),
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        id: user._id.toString(),
        role: user.role,
    });

    user.refreshToken = refreshToken;
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