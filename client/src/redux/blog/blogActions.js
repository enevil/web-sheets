import axios from "axios";
import { domain } from "../../config";
import {
  LOAD_POSTS,
  LOAD_POST,
  SWITCH_ON_LOADING,
  SWITCH_OFF_LOADING,
} from "../types";

export function getAllBlogPosts() {
  return async (dispatch) => {
    try {
      dispatch({
        type: SWITCH_ON_LOADING,
      });
      const { data } = await axios({
        method: "get",
        url: `${domain}/blog/get_all`,
      });
      dispatch({
        type: LOAD_POSTS,
        payload: data,
      });
      dispatch({
        type: SWITCH_OFF_LOADING,
      });
    } catch (error) {
      console.log("Get all posts error", error);
    }
  };
}

export function getOneBlogPost(path) {
  return async (dispatch) => {
    try {
      dispatch({
        type: SWITCH_ON_LOADING,
      });
      const { data } = await axios({
        method: "get",
        url: `${domain}/blog/get_one`,
        params: { path },
      });
      dispatch({
        type: LOAD_POST,
        payload: data,
      });
      dispatch({
        type: SWITCH_OFF_LOADING,
      });
    } catch (error) {
      console.log("Get one posts error", error);
    }
  };
}
