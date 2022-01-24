import Router from "express";
import UserController from "./UserController.js";
import fileMiddleware from "./middleware/file.js";

const userRouter = new Router();

userRouter.get("/get_one", UserController.getOneUser);
userRouter.post("/upload_img", fileMiddleware, UserController.uploadImage);

export default userRouter;
