import express, { Express } from "express";

import { userController } from "./src/controllers/UserController";
import { authValidation } from "./src/validations/AuthValidations";

const app: Express = express();
app.use(express.json());

// Auth routes
app.post("/register", authValidation.register, userController.register);
app.post("/login", authValidation.login, userController.login);

export { app };
