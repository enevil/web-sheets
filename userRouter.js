import Router from "express";
import UserController from "./UserController.js";

const userRouter = new Router();

userRouter.get("/get_one", UserController.getOneUser);

export default userRouter;
