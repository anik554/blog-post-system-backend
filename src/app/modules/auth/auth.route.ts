import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();
router.post("/login",AuthControllers.creadentialsLogin)

export const AuthRouters = router;
