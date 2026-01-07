import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler";
import User from "../models/User.model";
import Roles from "../models/Roles.model";

/**
 * @desc    Register new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const {
    clientId,
    username,
    email,
    password,
    role,
  }: {
    clientId: string;
    username: string;
    email: string;
    password: string;
    role: string;
  } = req.body;
  const user = await User.create({ clientId, username, email, password });
  await Roles.create({ userId: user._id, clientId, role });
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: { user, role },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({ message: "Login successful", token });
});
