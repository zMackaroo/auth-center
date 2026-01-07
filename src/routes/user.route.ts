import { Router } from "express";
import { getUsersByClientId } from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * /user/{clientId}:
 *   get:
 *     summary: Get all users by client ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: The client ID
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: Client not found
 */
router.get("/:clientId", getUsersByClientId);

export default router;
