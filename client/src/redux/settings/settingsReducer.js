import { SET_SETTINGS_MESSAGE } from "../types";

const initialState = {
  settingsMessages: "",
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS_MESSAGE:
      return { ...state, settingsMessages: action.payload };

    default:
      return state;
  }
};
