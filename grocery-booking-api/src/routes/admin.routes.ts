
import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticate } from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/login", UserController.login);
router.get("/grocery", authenticate(["ADMIN"]), AdminController.getGroceries);
router.post("/grocery", authenticate(["ADMIN"]), AdminController.addGrocery);
router.delete("/grocery/:id", authenticate(["ADMIN"]), AdminController.removeGroceryItem);
router.put("/grocery/:id", authenticate(["ADMIN"]), AdminController.updateGroceryItem);
router.patch("/grocery/:id/inventory", authenticate(["ADMIN"]), AdminController.updateInventory);

export default router;
