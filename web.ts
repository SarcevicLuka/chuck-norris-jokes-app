import express, {Express} from "express";
import { UserController } from "./src/controllers/UserController";

const app: Express = express();
app.use(express.json());

// Auth routes
app.post("/register", UserController.register)
app.post("/login", UserController.login)

export { app };