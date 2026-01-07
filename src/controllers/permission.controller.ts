import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import Permission from "../models/Permission.model";

/**
 * @desc    Update or create user permissions
 * @route   PUT /api/v1/permission/:clientId/:userId
 * @access  Private
 */
export const updatePermission = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId, userId } = req.params;
    let { permissions } = req.body;

    if (!permissions) {
      throw new AppError("Permissions object is required", 400);
    }

    // Parse if sent as string (form data)
    if (typeof permissions === "string") {
      try {
        permissions = JSON.parse(permissions);
      } catch {
        throw new AppError("Invalid permissions format", 400);
      }
    }

    if (typeof permissions !== "object") {
      throw new AppError("Permissions must be an object", 400);
    }

    const permission = await Permission.findOneAndUpdate(
      { clientId, userId },
      { permissions },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Permissions updated successfully",
      data: permission,
    });
  }
);

/**
 * @desc    Get user permissions
 * @route   GET /api/v1/permission/:clientId/:userId
 * @access  Private
 */
export const getPermission = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId, userId } = req.params;

    const permission = await Permission.findOne({ clientId, userId });

    if (!permission) {
      throw new AppError("Permissions not found", 404);
    }

    res.status(200).json({
      success: true,
      data: permission,
    });
  }
);

/**
 * @desc    Patch specific module permissions (merge with existing)
 * @route   PATCH /api/v1/permission/:clientId/:userId
 * @access  Private
 */
export const patchPermission = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId, userId } = req.params;
    const { module, permissions: modulePermissions } = req.body;

    if (!module || typeof module !== "string") {
      throw new AppError("Module name is required", 400);
    }

    if (!modulePermissions || typeof modulePermissions !== "object") {
      throw new AppError("Module permissions object is required", 400);
    }

    const updateKey = `permissions.${module}`;

    const permission = await Permission.findOneAndUpdate(
      { clientId, userId },
      { $set: { [updateKey]: modulePermissions } },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: `Permissions for module "${module}" updated successfully`,
      data: permission,
    });
  }
);

/**
 * @desc    Delete a specific module from permissions
 * @route   DELETE /api/v1/permission/:clientId/:userId/:module
 * @access  Private
 */
export const deleteModulePermission = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId, userId, module } = req.params;

    const updateKey = `permissions.${module}`;

    const permission = await Permission.findOneAndUpdate(
      { clientId, userId },
      { $unset: { [updateKey]: "" } },
      { new: true }
    );

    if (!permission) {
      throw new AppError("Permissions not found", 404);
    }

    res.status(200).json({
      success: true,
      message: `Module "${module}" removed from permissions`,
      data: permission,
    });
  }
);
