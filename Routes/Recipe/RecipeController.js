import { Recipe } from "../schemes.js";
import { request } from "gaxios";

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
      const params = req.body;
      const recipe = new Recipe({
        ...params,
      });
      await recipe.save();
      res
        .status(200)
        .json({ success: true, message: "Successfully add post to database" });
    } catch (error) {
      res.status(400).json({ message: "addRecipes error", error });
    }
  }

  async updateRecipe(req, res) {
    try {
      const { id, ...newData } = req.body;
      deleteImg(id);
      await Recipe.findByIdAndUpdate(id, newData);

      res
        .status(200)
        .json({ success: true, message: "Successfully update recipe" });
    } catch (error) {
      res.status(400).json({ message: "updateRecipe error", error });
    }
  }

  async deleteRecipe(req, res) {
    try {
      const { id } = req.body;
      deleteImg(id);
      await Recipe.findByIdAndRemove(id);

      res
        .status(200)
        .json({ success: true, message: "Successfully update recipe" });
    } catch (error) {
      res.status(400).json({ message: "updateRecipe error", error });
    }
  }
}

export default new RecipeController();

async function deleteImg(recipeId) {
  try {
    const { pathImg } = await Recipe.findById(recipeId);
    if (pathImg === "default.png") return;
    const uuid = pathImg.split("/")[0];
    await request({
      url: `https://api.uploadcare.com/files/${uuid}/`,
      method: "DELETE",
      headers: {
        Accept: "application/vnd.uploadcare-v0.5+json",
        Authorization: `Uploadcare.Simple ${process.env.UPPLOADCARE_PUBLIC_KEY}:${process.env.UPPLOADCARE_SECRET_KEY}`,
      },
    });
  } catch (error) {
    console.log("delete image error", error);
  }
}
