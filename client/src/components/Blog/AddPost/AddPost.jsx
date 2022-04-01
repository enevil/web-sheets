import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { domain } from "../../../config";
import css from "./AddPost.module.css";

export default function AddPost() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const { status } = await axios({
        method: "post",
        data: data,
        url: `${domain}/blog/add`,
      });
      console.log(status);
    } catch (error) {
      console.log("Add post error", error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="title" />
      <input {...register("fullTitle")} placeholder="fullTitle"></input>
      <textarea {...register("body")} placeholder="body"></textarea>
      <input {...register("pathImg")} placeholder="pathImg"></input>
      <input {...register("date")} placeholder="date"></input>
      <input type="submit" />
    </form>
  );
}
