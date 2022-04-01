import axios from "axios";
import { domain } from "../../config";
import { CHECK, LOGIN, LOGOUT } from "../types";
axios.defaults.auth = true;
axios.defaults.withCredentials = true;

export function login(userId) {
  return {
    type: LOGIN,
    payload: userId,
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${domain}/auth/logout`,
      });
      if (data.success) {
        dispatch({
          type: LOGOUT,
        });
      }
    } catch (error) {
      console.log("Logout error", error);
    }
  };
}

export function check() {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${domain}/auth/check`,
        withCredentials: true,
      });
      if (data.success) {
        dispatch({
          type: CHECK,
          payload: {
            isAuth: true,
            userId: data.decodedData.id,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: CHECK,
        payload: {
          isAuth: false,
          userId: null,
        },
      });
      console.log("Check error", error);
    }
  };
}
