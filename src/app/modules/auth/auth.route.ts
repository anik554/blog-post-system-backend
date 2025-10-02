import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();
router.post("/login",AuthControllers.creadentialsLogin)
router.post("/refresh-token",AuthControllers.getNewAccessToken)
router.post("/logout",AuthControllers.logout)

export const AuthRouters = router;
