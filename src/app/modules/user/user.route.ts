import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/register",validateRequest(createUserZodSchema),UserControllers.createUser);
router.patch("/:id",checkAuth("ADMIN"),validateRequest(updateUserZodSchema),UserControllers.updateUser);
router.get("/all-users",checkAuth("ADMIN"), UserControllers.getAllUsers);
router.get("/me", checkAuth("ADMIN"), UserControllers.getMe)

export const UserRoutes = router;