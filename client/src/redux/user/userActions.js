import axios from "axios";
import { BIND_PERSON, GET_USER, SET_PERSON_RATE } from "../types";
import { domain } from "../../config";

export function getOneUser(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "get",
        params: { id },
        url: domain + "/user/get_one",
      });
      dispatch({
        type: GET_USER,
        payload: data.data,
      });
    } catch (error) {
      console.log("Get one user error", error);
    }
  };
}

export function bindPersonToUser(personId = null) {
  return {
    type: BIND_PERSON,
    payload: personId,
  };
}

export function setRate(rate = 250) {
  return {
    type: SET_PERSON_RATE,
    payload: rate,
  };
}
