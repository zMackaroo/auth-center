import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Wrapper to catch async errors and pass them to error handler
 * Eliminates the need for try-catch in every controller
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
