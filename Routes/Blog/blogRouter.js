import Router from "express";
import BlogController from "./BlogController.js";

const blogRouter = new Router();

blogRouter.get("/get_all", BlogController.getAllBlogPosts);
blogRouter.get("/get_one", BlogController.getOneBlogPosts);
blogRouter.post("/add", BlogController.addBlogPost);

export default blogRouter;
