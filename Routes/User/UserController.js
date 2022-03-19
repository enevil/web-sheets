import { User } from "../schemes.js";
import fs from "fs";
import path from "path";
import { hashSync } from "bcrypt";

class UserController {
  async getOneUser(req, res) {
    try {
      const post = await User.findById(req.query.id);
      const { firstName, lastName, username, profileImage } = post;
      res.status(200).json({
        message: "getOneUser success",
        data: { firstName, lastName, username, profileImage },
      });
    } catch (e) {
      res.status(500).json({ message: "getOneUser error", e });
    }
  }

  async uploadImage(req, res) {
    try {
      const { imgFolder, filename } = res.locals;
      const user = await User.findById(req.query.userId);
      user.profileImage = filename;
      await user.save();

      fs.readdirSync(imgFolder).forEach((file) => {
        if (file.split(".")[0] === req.query.userId && file !== filename) {
          fs.unlinkSync(path.join(imgFolder, file));
        }
      });
      res
        .status(200)
        .json({ message: "uploadImage success", code: "IMAGE_SET_SUCCESS" });
    } catch (e) {
      res.status(500).json({ message: "uploadImage undefiend error", e });
    }
  }

  async changePassword(req, res) {
    try {
      const { id, password } = req.body;
      const hashPassword = hashSync(password, 5);
      await User.findByIdAndUpdate(id, { password: hashPassword });
      res.status(200).json({ message: "changeUserParams success" });
    } catch (e) {
      res.status(500).json({ message: "changePassword undefiend error", e });
    }
  }
}

export default new UserController();
