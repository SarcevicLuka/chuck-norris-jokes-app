import "dotenv/config";
import express, { Express } from "express";
import authRouter from "./src/routes/auth";
import apiRouter from "./src/routes/api";

const app: Express = express();
app.use(express.json());

// Auth routes
app.use("/auth", authRouter);

// Mail route
app.use("/user", apiRouter);

export default app;
