import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import spreadSheetRouter from "./spreadSheetRouter.js";
import authRouter from "./authRouter.js";
import blogRouter from "./blogRouter.js";
import userRouter from "./userRouter.js";

const PORT = 5000;
const mongoURI = "mongodb://localhost/dbanme";

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  })
);
//ROUTER
app.use("/static", express.static(path.join(path.resolve(), "static")));
app.use("/api", spreadSheetRouter);
app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/user", userRouter);
app.listen(PORT, () => console.log(`SERVER START WORKING ON PORT ${PORT}`));

// MONGOOSE

mongoose.connection.on("open", function () {
  console.log("Connected to mongo server.");
  return start_up();
});

mongoose.connection.on("error", function (err) {
  console.log("Could not connect to mongo server!");
  return console.log(err);
});

mongoose.connect(mongoURI);

const start_up = async () => {
  //   await launchDataTransfer();
};

app.get("/", async (req, res) => {
  res.send("<h1>Welcome to my server</h1>");
});
