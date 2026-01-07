import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import {
  loginValidator,
  registerValidator,
} from "../validators/auth.validator";
import {
  ValidateMiddleware,
  ValidateClientIsActive,
  ValidateLoginRequest,
} from "../middlewares/validate.middleware";

const router = Router();

router.post(
  "/register",
  ValidateMiddleware(registerValidator),
  ValidateClientIsActive,
  register
);

router.post(
  "/login",
  ValidateMiddleware(loginValidator),
  ValidateLoginRequest,
  login
);

export default router;
