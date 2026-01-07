import Client from "../models/Client.model";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";

/**
 * @desc    Register new client
 * @route   POST /api/v1/client/register
 * @access  Public
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    email,
    status,
  }: { name: string; email: string; status: string } = req.body;

  const client = await Client.create({ name, email, status });

  res.status(201).json({
    success: true,
    message: "Client registered successfully",
    data: client,
  });
});

/**
 * @desc    Get all clients
 * @route   GET /api/v1/client/all
 * @access  Public
 */
export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const clients = await Client.find();
  res.status(200).json({
    success: true,
    message: "Clients fetched successfully",
    data: clients,
  });
});

/**
 * @desc    Get a client by id
 * @route   GET /api/v1/client/:id
 * @access  Public
 */
export const getById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const client = await Client.findById(id);
  res.status(200).json({
    success: true,
    message: "Client fetched successfully",
    data: client,
  });
});

/**
 * @desc    Update a client by id
 * @route   PUT /api/v1/client/:id
 * @access  Public
 */
export const updateById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    email,
    status,
  }: { name: string; email: string; status: string } = req.body;
  const client = await Client.findByIdAndUpdate(
    id,
    { name, email, status },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "Client updated successfully",
    data: client,
  });
});
