import { Router } from "express";
import { signUp } from "../controllers/signUpController.js";
import { validateSignUp } from "../middlewares/signUpMiddleware.js"

const router = Router();

router.post("/signup", validateSignUp, signUp);

export default router;