import express from "express";
import { mailController } from "../controllers/MailController";
import { verifyJWT } from "../middleware/Auth";

const apiRouter = express.Router();

apiRouter.get("/joke", verifyJWT, mailController.sendJoke);

export default apiRouter;
