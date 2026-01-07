import { Router } from "express";
import {
  updatePermission,
  getPermission,
  patchPermission,
  deleteModulePermission,
} from "../controllers/permission.controller";

const router = Router();

/**
 * @swagger
 * /permission/{clientId}/{userId}:
 *   get:
 *     summary: Get permissions for a user in a client
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 */
router.get("/:clientId/:userId", getPermission);

/**
 * @swagger
 * /permission/{clientId}/{userId}:
 *   put:
 *     summary: Update permissions for a user
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Permissions updated
 */
router.put("/:clientId/:userId", updatePermission);

/**
 * @swagger
 * /permission/{clientId}/{userId}:
 *   patch:
 *     summary: Partially update permissions for a user
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Permissions patched
 */
router.patch("/:clientId/:userId", patchPermission);

/**
 * @swagger
 * /permission/{clientId}/{userId}/{module}:
 *   delete:
 *     summary: Delete a module permission for a user
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: module
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module permission deleted
 *       404:
 *         description: Permission not found
 */
router.delete("/:clientId/:userId/:module", deleteModulePermission);

export default router;
