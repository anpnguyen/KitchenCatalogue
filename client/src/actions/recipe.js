import axios from "axios";
// import { setAlert } from "../actions/alert";

import {
  GET_RECIPES,
  GET_RECIPES_ERROR,
  UPDATE_RECIPES_LS,
  UPDATE_RECIPES_LS_ERROR,
  CLEAR_RECIPE,
  CLEAR_ERROR
} from "../actions/types";

// ***  GET the all the users recipes ***
export const getRecipes = searchParams => async dispatch => {
  try {
    const config = {
      params: {
        search: searchParams
      }
    };

    const res = await axios.get("/api/recipe", config);

    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });

    localStorage.setItem("recipeState", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: GET_RECIPES_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};

//  *** Update  state from LS and reset it ****
export const updateFromLS = oldState => async dispatch => {
  try {
    dispatch({
      type: UPDATE_RECIPES_LS,
      payload: oldState
    });
  } catch (err) {
    dispatch({
      type: UPDATE_RECIPES_LS_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};

// *** Clear Recipe from State ie set to load again ***
export const clearRecipe = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_RECIPE
    });
  } catch (err) {
    dispatch({
      type: CLEAR_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};
