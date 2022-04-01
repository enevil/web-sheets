import { LOGIN, LOGOUT, CHECK } from "../types";

const initialState = {
  isAuth: false,
  userId: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, userId: action.payload };
    case LOGOUT:
      return initialState;
    case CHECK:
      return {
        ...state,
        userId: action.payload.userId,
        isAuth: action.payload.isAuth,
      };

    default:
      return state;
  }
};
