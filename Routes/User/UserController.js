import { User } from "../schemes.js";
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
      const { uuid, userId, fileName } = req.body;
      const user = await User.findById(userId);
      console.log(user.profileImage.split("/")[0]);
      user.profileImage = `${uuid}/${fileName}`;
      await user.save();

      res.status(200).json({ message: "uploadImage success" });
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
