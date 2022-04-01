import axios from "axios";
import { LOAD_RECIPE, LOAD_RECIPES } from "../types";
import { domain } from "../../config";

export function loadRecipes(searchValue, belongTo) {
  return async (dispatch) => {
    axios
      .get(`${domain}/recipe/get_many`, {
        params: { searchValue, belongTo },
      })
      .then((response) => {
        dispatch({
          type: LOAD_RECIPES,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function loadRecipe(id) {
  return async (dispatch) => {
    axios
      .get(`${domain}/recipe/get_one`, {
        params: { id },
      })
      .then((response) => {
        dispatch({
          type: LOAD_RECIPE,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
