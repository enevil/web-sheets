import { BIND_PERSON, GET_USER, SET_PERSON_RATE } from "../types";

const initialState = {
  userData: {},
  personId: "",
  personRate: 250,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userData: action.payload };
    case BIND_PERSON:
      return { ...state, personId: action.payload };
    case SET_PERSON_RATE:
      return { ...state, personRate: action.payload };

    default:
      return state;
  }
};
