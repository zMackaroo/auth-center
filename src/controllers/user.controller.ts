import { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/async-handler";
import User from "../models/User.model";

/**
 * @desc    Get all users by client ID with their roles
 * @route   GET /api/v1/user/:clientId
 * @access  Private
 */
export const getUsersByClientId = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const matchStage = {
      $match: { clientId: new mongoose.Types.ObjectId(clientId) },
    };

    const total = await User.countDocuments({ clientId });

    const users = await User.aggregate([
      matchStage,
      {
        $lookup: {
          from: "roles",
          localField: "_id",
          foreignField: "userId",
          as: "roles",
        },
      },
      {
        $lookup: {
          from: "permissions",
          localField: "_id",
          foreignField: "userId",
          as: "permissions",
        },
      },
      {
        $addFields: {
          roles: { $arrayElemAt: ["$roles.role", 0] },
          permissions: { $arrayElemAt: ["$permissions.permissions", 0] },
        },
      },
      {
        $project: {
          password: 0,
          clientId: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    res.status(200).json({
      success: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: users,
    });
  }
);
