import axios from "axios";
// import { setAlert } from "../actions/alert";

import {
    GET_COOKBOOKS,
    GET_COOKBOOKS_ERROR,
    LOAD_COOKBOOK_RECIPES,
    GET_COOKBOOK
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
      payload: { msg: "server error", status: "server error" }
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
    localStorage.setItem('selectedcookbook', JSON.stringify(selectedCookbook))
    history.push(`/cookbook/${selectedCookbook._id}`)


  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};

export const reloadCookbookRecipes = (selectedCookbook)  => async dispatch => {
  try {
     
    
    dispatch({
      type: LOAD_COOKBOOK_RECIPES,
      payload: selectedCookbook
    });
    


  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error", status: "server error" }
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
      payload: { msg: "server error", status: "server error" }
    });
  }
};