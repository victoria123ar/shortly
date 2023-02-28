import { Router } from "express";
import { listRanking } from "../controllers/urlsController.js";

const router = Router();

router.get("/ranking", listRanking); 

export default router;