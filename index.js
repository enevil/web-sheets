import express from "express";
import path from "path";
import cors from "cors";
import { CronJob } from "cron";
import mongoose from "mongoose";
import spreadSheetRouter from "./Routes/SpreadSheets/spreadSheetRouter.js";
import authRouter from "./Routes/Authentication/authRouter.js";
import blogRouter from "./Routes/Blog/blogRouter.js";
import userRouter from "./Routes/User/userRouter.js";
import recipeRouter from "./Routes/Recipe/recipeRouter.js";
import { request } from "gaxios";
import process from "process";

const PORT = process.env.PORT || 5000;
const mongoURI =
  "mongodb+srv://enevil:html5656@cluster0.dlo9a.mongodb.net/sheets?retryWrites=true&w=majority";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://web-sheets.netlify.app",
    // origin: "http://localhost:3000/",
    exposedHeaders: ["set-cookie"],
  })
);
//ROUTER
app.use("/static", express.static(path.join(path.resolve(), "static")));
app.use("/api", spreadSheetRouter);
app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.listen(PORT, () => console.log(`SERVER START WORKING ON PORT ${PORT}`));

// MONGOOSE

mongoose.connection.on("open", function () {
  console.log("Connected to mongo server.");
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

mongoose.connect(mongoURI);

// SCHEDULE
const updateDb = new CronJob("0 * * * *", function () {
  request({
    url: "https://websheets.herokuapp.com/api/update_db",
    method: "PUT",
  })
    .then()
    .catch((error) => {
      console.log(error);
    });
});
updateDb.start();
