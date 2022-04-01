import { combineReducers } from "redux";
import { appReducer } from "./app/appReducer";
import { blogReducer } from "./blog/blogReducer";
import { calendarReducer } from "./calendar/calendarReducer";
import { recipeReducer } from "./recipe/recipeReducer";
import { settingsReducer } from "./settings/settingsReducer";
import { userReducer } from "./user/userReducer";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  app: appReducer,
  blog: blogReducer,
  user: userReducer,
  settings: settingsReducer,
  recipe: recipeReducer,
});
