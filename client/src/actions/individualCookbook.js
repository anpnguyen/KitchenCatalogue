import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  GET_COOKBOOK,
  GET_COOKBOOK_ERROR,
  LOAD_COOKBOOK_RECIPES,
  LOAD_COOKBOOK_RECIPES_ERROR,
  REMOVE_RECIPE,
  REMOVE_RECIPE_ERROR
} from "../actions/types";

// ***  GET cookbook by ID  - if refresh ***

export const getCookbookById = cookbook_id => async dispatch => {
  try {
    const res = await axios.get(`/api/cookbook/${cookbook_id}`);

    dispatch({
      type: GET_COOKBOOK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COOKBOOK_ERROR,
      payload: { msg: "server error from get byID", status: "server error" }
    });
  }
};

//  *** Load the users selected cookbook *** 

export const loadCookbookRecipes = (
  selectedCookbook,
  history
) => async dispatch => {
  try {
    dispatch({
      type: LOAD_COOKBOOK_RECIPES,
      payload: selectedCookbook
    });

    history.push(`/cookbook/${selectedCookbook._id}`);
  } catch (err) {
    dispatch({
      type: LOAD_COOKBOOK_RECIPES_ERROR,
      payload: { msg: "server error from loadcookbook", status: "server error" }
    });
  }
};

//  ***   REMOVE a recipe from a cookbook ***
export const removeRecipeFromCookbook = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(
      `/api/cookbook/${data.cookbook_Id}`,
      data,
      config
    );

    localStorage.removeItem("cookbookState");
    dispatch({
      type: REMOVE_RECIPE,
      payload: res.data
    });

    dispatch(setAlert("recipe removed", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: REMOVE_RECIPE_ERROR,
      payload: {
        msg: "server error from remove recipe from cookbook",
        status: "server error"
      }
    });
  }
};
