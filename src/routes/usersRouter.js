import { Router } from "express";
import { authenticationValidation } from "../middlewares/authMiddleware.js";
import { listUser } from "../controllers/usersController.js";

const router = Router();

router.get("/users/me", authenticationValidation, listUser); 

export default router;