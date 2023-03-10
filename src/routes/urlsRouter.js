import { Router } from "express";
import { creatUrl, listUrl, redirectUrl, deleteUrl } from "../controllers/urlsController.js";
import { validateUrl } from "../middlewares/urlsMiddleware.js";
import { authenticationValidation } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/urls/shorten", authenticationValidation, validateUrl, creatUrl);
router.get("/urls/:id", listUrl); 
router.get("/urls/open/:shortUrl", redirectUrl);
router.delete("/urls/:id", authenticationValidation, deleteUrl);

export default router;