import { Router } from "express";
import { getUsersByClientId } from "../controllers/user.controller";

const router = Router();

router.get("/:clientId", getUsersByClientId);

export default router;
