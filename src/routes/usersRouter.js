import { Router } from "express";
import { listUser } from "../controllers/usersController.js";

const router = Router();

router.get("/users/me", listUser); 

export default router;