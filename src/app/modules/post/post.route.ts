import { PostControllers } from './post.controller';
import { Router } from "express";
import { upload } from "../../middlewares/imageUpload";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/create", checkAuth("ADMIN"),upload.single("image"), PostControllers.createPost)
router.get("/", checkAuth("ADMIN"), PostControllers.getAllPost)
router.delete("/:id", checkAuth("ADMIN"), PostControllers.deletePost)
router.patch("/:id", checkAuth("ADMIN"),upload.single("image"), PostControllers.updatePost)

export const PostRoutes = router