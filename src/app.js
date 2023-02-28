import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import signUpRouter from "./routes/signUpRouter.js"
import signInRouter from "./routes/signInRouter.js"
import urlRouter from "./routes/urlsRouter.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use(signUpRouter);
app.use(signInRouter);
app.use(urlRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));