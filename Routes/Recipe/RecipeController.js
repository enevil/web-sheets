import { Recipe } from "../schemes.js";
import fs from "fs";
import path from "path";
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

async function deleteImg(uuid) {
  try {
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

function updateImg(id, fullPath) {
  const imgFolder = path.resolve() + "/static/RecipesImages/";
  fs.readdirSync(imgFolder).forEach((file) => {
    if (file.split(".")[0] === id && file !== fullPath) {
      fs.unlinkSync(path.join(imgFolder, file));
    }
  });
}
