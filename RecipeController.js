import { Recipe } from "./schemes.js";

class RecipeController {
  async getRecipes(req, res) {
    try {
      const search = req.query.searchValue || "";
      const belongTo = req.query.belongTo || { $exists: true };
      const recipes = await Recipe.find({
        name: { $regex: search, $options: "i" },
        author: belongTo,
      }).limit(10);
      res.send(recipes);
    } catch (error) {
      res.status(400).json({ message: "getRecipes error", error });
    }
  }

  async getOneRecipe(req, res) {
    try {
      const recipe = await Recipe.findById(req.query.id);
      res.send(recipe);
    } catch (e) {
      res.status(400).json({ message: "getOneRecipe error", e });
    }
  }

  async addRecipe(req, res) {
    try {
      const params = res.locals.data;
      const recipe = new Recipe({
        ...params,
        weightOf: params.weightOf.split(","),
        ingredients: params.ingredients.split(","),
      });
      console.log(recipe);
      await recipe.save();
      res
        .status(200)
        .json({ success: true, message: "Successfully add post to database" });
    } catch (error) {
      res.status(400).json({ message: "addRecipes error", error });
    }
  }
}

export default new RecipeController();
