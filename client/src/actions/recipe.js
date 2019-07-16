// import React from 'react';
import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_ERROR,
  CLEAR_RECIPE,
  CLEAR_ERROR,
  CREATE_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPES_LS
} from "../actions/types";

// GET the all the users recipes
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
      type: RECIPE_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};

export const updateFromLS = (oldState) => async dispatch => {

  try {
   
    dispatch({
      type: UPDATE_RECIPES_LS,
      payload: oldState
    });
    
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }



}

// GET and individual Recipe
// export const getRecipeById = (recipeId, history) => async dispatch => {
//   try {
//     const res = await axios.get(`/api/recipe/${recipeId}`);
//     // this saves the recipe to local storage - so on edit refresh, it desont need to send another request
//     localStorage.setItem("recipe", JSON.stringify(res.data))    
 
    
    

//     dispatch({
//       type: GET_RECIPE,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: RECIPE_ERROR
//     });

    // history.push("/recipe");
  // }
// };


// Clear Recipe from State
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


// create Recipe


