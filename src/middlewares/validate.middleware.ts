import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import Client from "../models/Client.model";
import { AppError } from "../utils/app-error";

export const ValidateMiddleware = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors
        .array()
        .map((err) => err.msg)
        .join(", ");
      return next(new AppError(errorMessages, 400));
    }

    next();
  };
};

export const ValidateClientIsActive = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clientId } = req.body;

  if (!clientId) {
    return next(new AppError("Client id is required", 400));
  }

  const client = await Client.findById(clientId);

  if (!client) {
    return next(new AppError("Client not found", 404));
  }

  if (client.status !== "active") {
    return next(new AppError("Client is not active", 403));
  }

  next();
};

export const ValidateLoginRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, clientId } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  if (!clientId) {
    return next(new AppError("Client id is required", 400));
  }

  const client = await Client.findById(clientId);

  if (!client) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (client.status !== "active") {
    return next(
      new AppError("Account suspended. Please contact support.", 403)
    );
  }

  next();
};
