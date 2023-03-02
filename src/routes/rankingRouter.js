import { Router } from "express";
import { listRanking } from "../controllers/rankingController.js";

const router = Router();

router.get("/ranking", listRanking); 

export default router;