import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router()

router.post("/create",checkAuth("ADMIN"), CategoryControllers.createCategory)
router.get("/",checkAuth("ADMIN"), CategoryControllers.getAllCategories)
router.delete("/:id",checkAuth("ADMIN"), CategoryControllers.deleteCategory)

export const CategoryRoutes = router;