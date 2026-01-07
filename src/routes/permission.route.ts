import { Router } from "express";
import {
  updatePermission,
  getPermission,
  patchPermission,
  deleteModulePermission,
} from "../controllers/permission.controller";

const router = Router();

router.get("/:clientId/:userId", getPermission);
router.put("/:clientId/:userId", updatePermission);
router.patch("/:clientId/:userId", patchPermission);
router.delete("/:clientId/:userId/:module", deleteModulePermission);

export default router;
