import Router from "express";
import UserController from "./UserController.js";

const userRouter = new Router();

userRouter.get("/get_one", UserController.getOneUser);
userRouter.post("/upload_img", UserController.uploadImage);
userRouter.put("/change_password", UserController.changePassword);

export default userRouter;
