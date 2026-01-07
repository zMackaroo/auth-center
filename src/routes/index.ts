import { Router } from "express";
import AuthRoutes from "./auth.route";
import ClientRoutes from "./client.route";
import UserRoutes from "./user.route";
import PermissionRoutes from "./permission.route";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", AuthRoutes);
router.use("/client", ClientRoutes);
router.use("/user", UserRoutes);
router.use("/permission", PermissionRoutes);

export default router;
