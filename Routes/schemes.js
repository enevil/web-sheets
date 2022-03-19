import mongoose from "mongoose";

const dateSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  persons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  dates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dates" }],
});

const associationSchema = new mongoose.Schema({
  shiftTime: { type: String, trim: true },
  shiftProp: { type: String, trim: true },
  date: { type: mongoose.Schema.Types.ObjectId, ref: "Date" },
  person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  profileImage: {
    type: String,
  },
});

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  path: {
    type: String,
    required: true,
    trim: true,
  },
  fullTitle: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  pathImg: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  products: [{ ingredient: String, weightOf: String }],
  pathImg: {
    type: String,
    required: true,
    trim: true,
  },
});

export const Datetime = mongoose.model("Date", dateSchema);
export const Person = mongoose.model("Person", personSchema);
export const Association = mongoose.model("Association", associationSchema);

export const User = mongoose.model("User", userSchema);
export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export const Recipe = mongoose.model("Recipe", recipeSchema);
