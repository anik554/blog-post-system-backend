import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { PostControllers } from "./post.controller";

const router = Router();

router.post("/create", checkAuth("ADMIN"), PostControllers.createPost)
router.get("/", checkAuth("ADMIN"), PostControllers.getAllPost)
router.delete("/:id", checkAuth("ADMIN"), PostControllers.deletePost)
router.patch("/:id", checkAuth("ADMIN"), PostControllers.updatePost)

export const PostRoutes = router