import { body } from "express-validator";

export const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["active", "inactive"])
    .withMessage("Invalid status"),
];

export const updateValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["active", "inactive"])
    .withMessage("Invalid status"),
];
