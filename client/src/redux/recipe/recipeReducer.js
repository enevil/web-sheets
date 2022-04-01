import { LOAD_RECIPES, LOAD_RECIPE } from "../types";

const initialState = {
  recipes: [],
  recipe: {},
};

export const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RECIPES:
      return { ...state, recipes: action.payload };
    case LOAD_RECIPE:
      return { ...state, recipe: action.payload };

    default:
      return state;
  }
};
