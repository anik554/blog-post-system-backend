import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { CategoryControllers } from "./category.controller";

const router = Router()

router.post("/create",checkAuth("ADMIN"), CategoryControllers.createCategory)
router.get("/",checkAuth("ADMIN"), CategoryControllers.getAllCategories)
router.delete("/:id",checkAuth("ADMIN"), CategoryControllers.deleteCategory)

export const CategoryRoutes = router;