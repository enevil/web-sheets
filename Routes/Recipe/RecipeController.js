import { Recipe } from "../schemes.js";
import fs from "fs";
import path from "path";

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
      });

      // RENAME IMAGE NAME TO ID
      recipe.pathImg = renameImgToId(recipe.id, recipe.pathImg);

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
      const { id, ...newData } = res.locals.data;
      newData.pathImg = renameImgToId(id, newData.pathImg);
      updateImg(id, newData.pathImg);
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

function renameImgToId(id, fullPath) {
  const imgFolder = path.resolve() + "/static/RecipesImages/";
  const pathParams = fullPath.split(".");

  if (pathParams[0] !== "default") {
    const newPath = `${id}.${pathParams[1]}.${pathParams[2]}`;
    fs.renameSync(
      path.join(imgFolder, fullPath),
      path.join(imgFolder, newPath)
    );
    return newPath;
  }
  return "default.png";
}

function deleteImg(id) {
  const imgFolder = path.resolve() + "/static/RecipesImages/";
  fs.readdirSync(imgFolder).forEach((file) => {
    if (file.split(".")[0] === id) {
      fs.unlinkSync(path.join(imgFolder, file));
    }
  });
}

function updateImg(id, fullPath) {
  const imgFolder = path.resolve() + "/static/RecipesImages/";
  fs.readdirSync(imgFolder).forEach((file) => {
    if (file.split(".")[0] === id && file !== fullPath) {
      fs.unlinkSync(path.join(imgFolder, file));
    }
  });
}
