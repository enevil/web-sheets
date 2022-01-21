import { User } from "./schemes.js";

class UserController {
  async getOneUser(req, res) {
    try {
      console.log(req.query.id);
      const post = await User.findById(req.query.id);
      const { firstName, lastName, username } = post;
      res.send({ firstName, lastName, username });
    } catch (e) {
      res.status(400).json({ message: "getOneUser error", e });
    }
  }
}

export default new UserController();
