import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import AppError from "../../utils/AppError";

interface ChangePasswordInput {
    oldPassword: string;
    newPassword: string;
}

export const changePasswordService = async (
    userId: string,
    payload: ChangePasswordInput
): Promise<void> => {
    const { oldPassword, newPassword } = payload;

    if (!oldPassword || !newPassword) {
        throw new AppError("Old password and new password are required", 400);
    }

    const user = await User.findById(userId).select(
        "+password +refreshToken"
    );

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isOldPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password
    );

    if (!isOldPasswordMatched) {
        throw new AppError("Old password is incorrect", 400);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;

    // force logout from all current sessions
    user.refreshToken = null;
    user.tokenVersion += 1;

    await user.save();
};