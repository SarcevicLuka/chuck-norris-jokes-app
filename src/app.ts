import "dotenv/config";
import express, { Express } from "express";
import authRouter from "./routes/auth";
import apiRouter from "./routes/api";
import cors from "cors";
import { corsConfig } from "./config/conrs.config";

const app: Express = express();
app.use(express.json());
app.use(cors(corsConfig));

// Auth routes
app.use("/auth", authRouter);

// Mail route
app.use("/user", apiRouter);

export default app;
