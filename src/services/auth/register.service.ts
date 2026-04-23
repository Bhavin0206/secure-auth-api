import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import AppError from "../../utils/AppError";

interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  id: string;
  name: string;
  email: string;
  role: number;
}

export const registerUserService = async (
  payload: RegisterUserInput
): Promise<RegisterUserResponse> => {
  const { name, email, password } = payload;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists with this email", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 0,
  });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};