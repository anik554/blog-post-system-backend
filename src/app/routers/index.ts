import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRouters } from "../modules/auth/auth.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { PostRoutes } from "../modules/post/post.route";
import { CommentRoutes } from "../modules/comment/comment.route";

export const router = Router();

const modulesRouters = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRouters,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
];

modulesRouters.forEach((route) => {
  router.use(route.path, route.route);
});