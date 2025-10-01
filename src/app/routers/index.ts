import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const modulesRouters = [
  {
    path: "/user",
    route: UserRoutes,
  },
];

modulesRouters.forEach((route) => {
  router.use(route.path, route.route);
});