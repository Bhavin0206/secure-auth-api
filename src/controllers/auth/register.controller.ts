import { Request, Response, NextFunction } from "express";
import { registerUserService } from "../../services/auth/register.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};