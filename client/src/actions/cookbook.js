import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  GET_COOKBOOKS,
  GET_COOKBOOKS_ERROR,
  LOAD_COOKBOOK_RECIPES,
  GET_COOKBOOK,
  UPDATE_COOKBOOKS,
  CREATE_COOKBOOK,
  DELETE_COOKBOOK,
  UPDATE_COOKBOOK,
  RENAME_COOKBOOK
} from "../actions/types";

// GET the all the users recipes
export const getCookbooks = () => async dispatch => {
  try {
    const res = await axios.get("/api/cookbook");

    dispatch({
      type: GET_COOKBOOKS,
      payload: res.data
    });

    localStorage.setItem('cookbookState', JSON.stringify(res.data))
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from getCookbooks", status: "server error" }
    });
  }
};

export const updateCookbookFromLS = (oldState) => async dispatch => {

  try {
   
    dispatch({
      type: 'UPDATE_COOKBOOK_LS',
      payload: oldState
    });
    
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
}


// Load the users selected cookbook

export const loadCookbookRecipes = (
  selectedCookbook,
  history
) => async dispatch => {
  try {
    dispatch({
      type: LOAD_COOKBOOK_RECIPES,
      payload: selectedCookbook
    });
    // localStorage.setItem('selectedcookbook', JSON.stringify(selectedCookbook))
    history.push(`/cookbook/${selectedCookbook._id}`);
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from loadcookbook", status: "server error" }
    });
  }
};

// GET cookbook by ID  - if refresh

export const getCookbookById = cookbook_id => async dispatch => {
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

export const addRecipeToCookbook = data => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(`/api/cookbook/`, data, config);
    localStorage.removeItem("cookbookState");

    dispatch(setAlert("Recipe Sucessfully Added", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: {
        msg: "server error from get updateCookbooks",
        status: "server error"
      }
    });
  }
};

// create new cookbook

export const createNewCookbook = cookbookTitle => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(`/api/cookbook/`, cookbookTitle, config);

    localStorage.removeItem('cookbookState')

    dispatch({
      type: CREATE_COOKBOOK,
      payload: res.data
    });

    dispatch(setAlert("Recipe Sucessfully Added", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: {
        msg: "server error from get createCookbook",
        status: "server error"
      }
    });
  }
};

export const deleteCookbook = cookbook_id => async dispatch => {
  try {
    const res = await axios.delete(`/api/cookbook/${cookbook_id}`);

    dispatch({
      type: DELETE_COOKBOOK,
      payload: res.data.deletedCookbookId
    });
    localStorage.removeItem('cookbookState')
    dispatch(setAlert("Cookbook Deleted", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: {
        msg: "server error from get createCookbook",
        status: "server error"
      }
    });
  }
};

export const removeRecipeFromCookbook = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    console.log(data.cookbook_Id);
    console.log(data);
    const res = await axios.put(
      `/api/cookbook/${data.cookbook_Id}`,
      data,
      config
    );

    localStorage.removeItem('cookbookState')
    dispatch({
      type: UPDATE_COOKBOOK,
      payload: res.data
    });

    console.log(res.data);

    dispatch(setAlert("recipe removed", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: {
        msg: "server error from remove recipe from cookbook",
        status: "server error"
      }
    });
  }
};

export const renameCookbookById = data => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.put(
      `/api/cookbook/${data.cookbookId}`,
      data,
      config
    );
    localStorage.removeItem('cookbookState')
    dispatch({
      type: RENAME_COOKBOOK,
      payload: res.data
    });

    dispatch(setAlert("cookbook Updated", "RecipeEditSuccess"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "renameCOokbook", status: "server error" }
    });
  }
};
