import { SET_SETTINGS_MESSAGE } from "../types";

export function setMessage(message = null) {
  return {
    type: SET_SETTINGS_MESSAGE,
    payload: message,
  };
}
