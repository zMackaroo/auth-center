import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error";

export const ErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default values
  let statusCode = 500;
  let message = "Internal Server Error";
  let status = "error";

  // Handle operational errors
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    status = err.status;
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
    status = "fail";
  }

  // Handle Mongoose duplicate key error
  if ((err as any).code === 11000) {
    statusCode = 400;
    const field = Object.keys((err as any).keyValue)[0];
    message = `${field} already exists.`;
    status = "fail";
  }

  // Handle Mongoose cast error (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format.";
    status = "fail";
  }

  // Log error in development
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  }

  // Send response
  res.status(statusCode).json({
    success: false,
    status,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
