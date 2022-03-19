import { BlogPost } from "../schemes.js";

class BlogController {
  async getAllBlogPosts(req, res) {
    try {
      const allPosts = await BlogPost.find({});
      res.send(allPosts);
    } catch (e) {
      res.status(400).json({ message: "getAllBlogPosts error", e });
    }
  }

  async getOneBlogPosts(req, res) {
    try {
      const post = await BlogPost.findOne({ path: req.query.path });
      res.send(post);
    } catch (e) {
      res.status(400).json({ message: "getOneBlogPosts error", e });
    }
  }

  async addBlogPost(req, res) {
    try {
      const { title, fullTitle, body, pathImg, date } = req.body;
      const [day, month, year] = date.split(".");

      const post = new BlogPost({
        title,
        fullTitle,
        path: rus_to_latin(title.toLowerCase().replaceAll(" ", "-")),
        body,
        pathImg,
        date: new Date(+year, +month - 1, +day),
      });
      await post.save();
      res
        .status(200)
        .json({ message: "Successfully add post to database", success: true });
    } catch (e) {
      res.status(400).json({ message: "addBlogPosts error", e });
    }
  }
}

export default new BlogController();

function rus_to_latin(str) {
  var ru = {
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "e",
      ж: "j",
      з: "z",
      и: "i",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "h",
      ц: "c",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ы: "y",
      э: "e",
      ю: "u",
      я: "ya",
    },
    n_str = [];

  str = str.replace(/[ъь]+/g, "").replace(/й/g, "i");

  for (var i = 0; i < str.length; ++i) {
    n_str.push(
      ru[str[i]] ||
        (ru[str[i].toLowerCase()] == undefined && str[i]) ||
        ru[str[i].toLowerCase()].toUpperCase()
    );
  }

  return n_str.join("");
}
