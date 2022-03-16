import { User } from "./schemes.js";
import bcrypt, { compareSync } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { CONFIG } from "./config.js";

const SEVEN_DAYS = 3600000 * 24 * 7;

const generateAccessToken = (id) => {
  const payload = { id };
  return jsonwebtoken.sign(payload, CONFIG.SECRET, { expiresIn: SEVEN_DAYS });
};

class AuthController {
  async registration(req, res) {
    try {
      const { email, firstName, lastName, password, username } = req.body;
      const candidateEmail = await User.findOne({ email: email });
      const candidateUsername = await User.findOne({ username: username });

      if (candidateEmail) {
        return res.status(409).json({
          message: "Registration error",
          cause: "isExist",
          field: "email",
          label: "Email",
        });
      }
      if (candidateUsername) {
        return res.status(409).json({
          message: "Registration error",
          cause: "isExist",
          field: "username",
          label: "Никнейм",
        });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const user = new User({
        email,
        firstName,
        lastName,
        username,
        password: hashPassword,
      });
      await user.save();

      const token = generateAccessToken(user.id);
      res.set("Access-Control-Expose-Headers", ["*", "Authorization"]);
      res.cookie("Authorization", `Bearer ${token}`, {
        maxAge: SEVEN_DAYS,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        message: "Registration completed",
        response: "success",
        userId: user.id,
      });
    } catch (e) {
      res.status(400).json({ message: "Registration error", e });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          message: "Login error",
          cause: "isNotExist",
          field: "email",
          label: "Email",
        });
      }
      const validPassword = compareSync(password, user.password);
      if (!validPassword) {
        return res.status(403).json({
          message: "Login error",
          cause: "wrongData",
          field: "password",
          label: "Пароль",
        });
      }

      const token = generateAccessToken(user.id);
      res.set("Access-Control-Expose-Headers", ["*", "Authorization"]);
      res.cookie("Authorization", `Bearer ${token}`, {
        maxAge: SEVEN_DAYS,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({
        message: "Login completed",
        response: "success",
        userId: user.id,
      });
    } catch (e) {
      res.status(400).json({ message: "Login error", e });
    }
  }

  async logout(req, res) {
    // Set token to none and expire after 1 second
    res.cookie("Authorization", "none", {
      expires: new Date(Date.now() + 1000),
      httpOnly: true,
      secure: true,
      sameSite: false,
    });
    res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  }

  async check(req, res) {
    try {
      console.log(req.headers);
      const token = req.headers.cookie.split("%20")[1];
      if (!token) {
        return res.status(403).json({
          message: "Check error",
          cause: "tokenNotFound",
        });
      }
      const decodedData = jsonwebtoken.verify(token, CONFIG.SECRET);
      if (!decodedData) {
        return res.status(403).json({
          message: "Check error",
          cause: "tokenNotCorrect",
        });
      }
      res.status(200).json({
        message: "Check completed",
        success: true,
        decodedData,
      });
    } catch (e) {
      res.status(400).json({ message: "Check error", e });
    }
  }
}

export default new AuthController();
