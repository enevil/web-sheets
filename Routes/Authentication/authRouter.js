import Router from "express";
import AuthController from "./AuthController.js";

const authRouter = new Router();

authRouter.post("/registration", AuthController.registration);
authRouter.post("/login", AuthController.login);
authRouter.get("/check", AuthController.check);
authRouter.get("/logout", AuthController.logout);

export default authRouter;
