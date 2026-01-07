import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const NotFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404));
};
