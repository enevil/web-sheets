import { User } from "../schemes.js";
import { hashSync } from "bcrypt";
import { request } from "gaxios";

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
      const { userId, pathImg } = req.body;
      const user = await User.findById(userId);
      const prevImage = user?.profileImage;
      if (prevImage)
        await request({
          url: `https://api.uploadcare.com/files/${prevImage.split("/")[0]}/`,
          method: "DELETE",
          headers: {
            Accept: "application/vnd.uploadcare-v0.5+json",
            Authorization: `Uploadcare.Simple ${process.env.UPPLOADCARE_PUBLIC_KEY}:${process.env.UPPLOADCARE_SECRET_KEY}`,
          },
        });
      user.profileImage = pathImg;
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
