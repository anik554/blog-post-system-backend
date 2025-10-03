import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRouters } from "../modules/auth/auth.route";
import { CategoryRoutes } from "../modules/category/category.route";

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
];

modulesRouters.forEach((route) => {
  router.use(route.path, route.route);
});