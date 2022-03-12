import multer from "multer";
import path from "path";

const uploadFile = (req, res, next) => {
  const imgFolder = path.resolve() + "/static/RecipesImages/";

  if (!req.query.hasImg) {
    const upload = multer().none();
    // DUBLICATE BODY BUG NORMALIZATION
    upload(req, res, function () {
      const formData = JSON.parse(req.body.formData[0]);
      res.locals.data = {
        ...formData,
        pathImg: formData.oldPath || "default.png",
      };
    });
  }

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(imgFolder));
    },
    filename(req, file, cb) {
      const timestamp = Date.now();
      const formData = JSON.parse(req.body.formData);
      const filename = `${formData.name}.${timestamp}.${
        file.mimetype.split("/")[1]
      }`;
      res.locals.data = {
        ...formData,
        pathImg: filename,
      };

      cb(null, filename);
    },
  });

  const types = ["image/png", "image/jpg", "image/jpeg"];

  const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new multer.MulterError("FORBIDDEN_TYPE", file.fieldname), false);
    }
  };

  const limits = { fileSize: 1000000 };

  const fileMiddleware = multer({ storage, fileFilter, limits }).single("img");

  fileMiddleware(req, res, function (e) {
    if (e instanceof multer.MulterError) {
      switch (e.code) {
        case "FORBIDDEN_TYPE":
          res.status(415).json({ e });
          return;
        case "LIMIT_FILE_SIZE":
          res.status(413).json({ e });
          return;
        default:
          console.log(e);
          res.status(400).json({ e });
          return;
      }
    } else if (e) {
      res.status(500).json({ message: "uploadImage undefiend error", e });
      return;
    }
    next();
  });
};

export default uploadFile;
