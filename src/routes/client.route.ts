import { Router } from "express";

import {
  getAll,
  getById,
  register,
  updateById,
} from "../controllers/client.controller";

import {
  registerValidator,
  updateValidator,
} from "../validators/client.validator";

import { ValidateMiddleware } from "../middlewares/validate.middleware";

const router = Router();

router.get("/all", getAll);
router.get("/:id", getById);

router.post("/register", ValidateMiddleware(registerValidator), register);

router.put("/:id", ValidateMiddleware(updateValidator), updateById);

export default router;
