import express, { Express } from "express";

import { userController } from "./src/controllers/UserController";
import { mailController } from "./src/controllers/MailController";
import { authValidation } from "./src/validations/AuthValidations";
import { verifyJWT } from "./src/middleware/Auth";

const app: Express = express();
app.use(express.json());

// Auth routes
app.post("/register", authValidation.register, userController.register);
app.post("/login", authValidation.login, userController.login);

// Mail route
app.get("/joke", verifyJWT, mailController.sendJoke);

export { app };
