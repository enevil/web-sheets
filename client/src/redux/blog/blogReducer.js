import {
  LOAD_POSTS,
  LOAD_POST,
  SWITCH_ON_LOADING,
  SWITCH_OFF_LOADING,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  isLoading: true,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...state, posts: action.payload };
    case LOAD_POST:
      return { ...state, post: action.payload };
    case SWITCH_ON_LOADING:
      return { ...state, isLoading: true };
    case SWITCH_OFF_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
