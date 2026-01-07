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

/**
 * @swagger
 * /client/all:
 *   get:
 *     summary: Get all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 clients:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 */
router.get("/all", getAll);

/**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The client ID
 *     responses:
 *       200:
 *         description: Client details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Client not found
 */
router.get("/:id", getById);

/**
 * @swagger
 * /client/register:
 *   post:
 *     summary: Register a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Application
 *               description:
 *                 type: string
 *                 example: Client application description
 *     responses:
 *       201:
 *         description: Client registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Validation error
 */
router.post("/register", ValidateMiddleware(registerValidator), register);

/**
 * @swagger
 * /client/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 */
router.put("/:id", ValidateMiddleware(updateValidator), updateById);

export default router;
