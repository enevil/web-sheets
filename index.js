import express from "express";
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
const mongoURI = process.env.MONGO_URI;

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
//ROUTER
app.use("/api", spreadSheetRouter);
app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/user", userRouter);
app.use("/recipe", recipeRouter);
app.use("*", express.static("client/build"));

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
    url: "https://websheets-i.herokuapp.com/api/update_db",
    method: "PUT",
  })
    .then()
    .catch((error) => {
      console.log(error);
    });
});
updateDb.start();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
