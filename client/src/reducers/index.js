import { combineReducers } from "redux";

import alert from "./alert";
import auth from "./auth";
import recipe from "./recipe";
import search from "./search";
import cookbook from "./cookbook";
import individualCookbook from "./individualCookbook";
import individualRecipe from "./individualRecipe";

// this sets the name of the state
export default combineReducers({
  alert,
  auth,
  recipe,
  search,
  cookbook,
  individualCookbook,
  individualRecipe
});
