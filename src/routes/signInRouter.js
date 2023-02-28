import { Router } from "express";
import { signIn } from "../controllers/signInController.js";
import { validateSignIn } from "../middlewares/signInMiddleware.js"

const router = Router();

router.post("/signin", validateSignIn, signIn);

export default router;