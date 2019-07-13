import axios from "axios";
import { setAlert } from "../actions/alert";

import {
    GET_COOKBOOKS,
    GET_COOKBOOKS_ERROR,
    LOAD_COOKBOOK_RECIPES,
    GET_COOKBOOK,
    UPDATE_COOKBOOKS,
    CREATE_COOKBOOK
     } from "../actions/types";

// GET the all the users recipes
export const getCookbooks = ()  => async dispatch => {
  try {
  
    const res = await axios.get("/api/cookbook");
    
    dispatch({
      type: GET_COOKBOOKS,
      payload: res.data
    });


  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from getCookbooks", status: "server error" }
    });
  }
};

// Load the users selected cookbook

export const loadCookbookRecipes = (selectedCookbook, history)  => async dispatch => {
  try {
     
    
    dispatch({
      type: LOAD_COOKBOOK_RECIPES,
      payload: selectedCookbook
    });
    // localStorage.setItem('selectedcookbook', JSON.stringify(selectedCookbook))
    history.push(`/cookbook/${selectedCookbook._id}`)


  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from loadcookbook", status: "server error" }
    });
  }
};



// GET cookbook by ID  - if refresh

export const getCookbookById = (cookbook_id)  => async dispatch => {
  try {
  
    const res = await axios.get(`/api/cookbook/${cookbook_id}`);
    
    dispatch({
      type: GET_COOKBOOK,
      payload: res.data
    });


  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from get byID", status: "server error" }
    });
  }
};

// add recipe/ recipes to cookbook

export const addRecipeToCookbook = (data)  => async dispatch => {
  try {
    
    
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/cookbook/`, data, config);
    // getCookbooks()

    dispatch(setAlert("Recipe Sucessfully Added", "RecipeEditSuccess"));

  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from get updateCookbooks", status: "server error" }
    });
  }
};

// create new cookboko

export const createNewCookbook = (cookbookTitle)  => async dispatch => {
  try {
    
    
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`/api/cookbook/`, cookbookTitle, config);

    dispatch({
      type: CREATE_COOKBOOK,
      payload: res.data
    });
    

    dispatch(setAlert("Recipe Sucessfully Added", "RecipeEditSuccess"));

  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from get createCookbook", status: "server error" }
    });
  }
};





   