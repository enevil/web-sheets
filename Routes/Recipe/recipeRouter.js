import Router from "express";
import RecipeController from "./RecipeController.js";
import imageMiddleware from "../middleware/recipeImg.js";

const recipeRouter = new Router();

recipeRouter.get("/get_many", RecipeController.getRecipes);
recipeRouter.get("/get_one", RecipeController.getOneRecipe);
recipeRouter.post("/add", imageMiddleware, RecipeController.addRecipe);
recipeRouter.put("/edit", imageMiddleware, RecipeController.updateRecipe);
recipeRouter.delete("/delete", RecipeController.deleteRecipe);

export default recipeRouter;
