import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { CommentControllers } from "./comment.controller";

const router = Router();

router.post("/create", checkAuth("ADMIN"), CommentControllers.createComment);
router.get("/", checkAuth("ADMIN"), CommentControllers.getAllComment);
router.delete("/:id", checkAuth("ADMIN"), CommentControllers.deleteComment);
router.patch("/:id", checkAuth("ADMIN"), CommentControllers.updateComment);

export const CommentRoutes = router;
