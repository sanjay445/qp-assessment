
import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
router.post("/login", UserController.login);
router.post("/order", authenticate(["USER"]), UserController.createOrder);
router.get("/grocery", authenticate(["USER"]), UserController.getGroceries);

export default router;
