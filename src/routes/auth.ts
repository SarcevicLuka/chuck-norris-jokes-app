import express from "express";
import { userController } from "../controllers/UserController";
import { authValidation } from "../validations/AuthValidations";

const apiRouter = express.Router();

apiRouter.post("/register", authValidation.register, userController.register);
apiRouter.post("/login", authValidation.login, userController.login);

export default apiRouter;
