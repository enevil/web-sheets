import Router from "express";
import RecipeController from "./RecipeController.js";

const recipeRouter = new Router();

recipeRouter.get("/get_many", RecipeController.getRecipes);
recipeRouter.get("/get_one", RecipeController.getOneRecipe);
recipeRouter.post("/add", RecipeController.addRecipe);
recipeRouter.put("/edit", RecipeController.updateRecipe);
recipeRouter.delete("/delete", RecipeController.deleteRecipe);

export default recipeRouter;
