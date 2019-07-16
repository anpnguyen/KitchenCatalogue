import axios from "axios";
import { setAlert } from "../actions/alert";
import {getRecipes} from '../actions/recipe'

import {
  GET_RECIPE,
  GET_RECIPE_ERROR,
  UPDATE_RECIPE_LS,
  UPDATE_RECIPE_LS_ERROR,
  CREATE_RECIPE,
  CREATE_RECIPE_ERROR,
  EDIT_RECIPE,
  EDIT_RECIPE_ERROR,
  DELETE_RECIPE,
  DELETE_RECIPE_ERROR
  //   UPDATE_RECIPES_LS
} from "../actions/types";

export const getRecipeById = (recipeId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/recipe/${recipeId}`);
    // this saves the recipe to local storage - so on edit refresh, it desont need to send another request
    // localStorage.setItem("recipe", JSON.stringify(res.data))

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_RECIPE_ERROR
    });

    history.push("/recipe");
  }
};
export const updateRecipe_LS = foundRecipe => async dispatch => {
  try {
    dispatch({
      type: UPDATE_RECIPE_LS,
      payload: foundRecipe
    });
  } catch (err) {
    dispatch({
      type: UPDATE_RECIPE_LS_ERROR
    });
  }
};

export const createRecipe = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/recipe", formData, config);

    // clears the local stoage, so home page rerenders
    localStorage.removeItem("recipeState");
    dispatch(getRecipes())
    dispatch({
      type: CREATE_RECIPE,
      payload: res.data
    });
    getRecipes()
    dispatch(setAlert("Recipe Created", "RecipeEditSuccess"));

    history.push(`/recipe/${res.data._id}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "LoginDanger")));
    }

    dispatch({
      type: CREATE_RECIPE_ERROR,
      payload: { msg: "create recipe error ", status: "server error" }
    });
  }
};

export const editRecipePut = (
  formData,
  history,
  recipeId
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/recipe/${recipeId}`, formData, config);
    localStorage.removeItem("recipeState");

    dispatch({
      type: EDIT_RECIPE,
      payload: res.data
    });
    
    console.log('called from action edit')
    dispatch(setAlert("Recipe Sucessfully Edited", "RecipeEditSuccess"));
    dispatch(getRecipes())
    history.push(`/recipe/${recipeId}`);
  } catch (err) {
    const errors = err.response.data;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, error.errorType)));
    }

    dispatch({
      type: EDIT_RECIPE_ERROR,
      payload: { msg: "create profile error ", status: "server error" }
    });
  }
};

// Delete A Recipe

export const deleteRecipe = (history, recipeId) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    let data = { recipeToDelete: recipeId };
    await axios.delete(`/api/recipe/${recipeId}`);
    await axios.put("/api/cookbook/deleteRecipe/deleteRecipe", data, config);

    // clears the local stoage, so home page rerenders
    localStorage.removeItem("recipeState");
    dispatch(getRecipes)

    dispatch({
      type: DELETE_RECIPE
    });

    dispatch(setAlert("Recipe Sucessfully Deleted", "RecipeEditSuccess"));
    
    console.log(history)
    history.goBack()

  } catch (err) {
    dispatch({
      type: DELETE_RECIPE_ERROR,
      payload: { msg: "delete recipe error ", status: "server error" }
    });
  }
};
