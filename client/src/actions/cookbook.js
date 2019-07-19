import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  GET_COOKBOOKS,
  GET_COOKBOOKS_ERROR,
  UPDATE_COOKBOOKS_LS,
  UPDATE_COOKBOOKS_LS_ERROR,
  ADD_RECIPE_TO_COOKBOOKS,
  ADD_RECIPE_TO_COOKBOOKS_ERROR,
  CREATE_COOKBOOK,
  CREATE_COOKBOOK_ERROR,
  DELETE_COOKBOOK,
  DELETE_COOKBOOK_ERROR,
  RENAME_COOKBOOK,
  RENAME_COOKBOOK_ERROR
} from "../actions/types";

// GET the all the users recipes
export const getCookbooks = () => async dispatch => {
  try {
    const res = await axios.get("/api/cookbook");

    dispatch({
      type: GET_COOKBOOKS,
      payload: res.data
    });

    localStorage.setItem("cookbookState", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: GET_COOKBOOKS_ERROR,
      payload: { msg: "server error from getCookbooks", status: "server error" }
    });
  }
};

// If the user refreshes, this will update the state from local storage
export const updateCookbookFromLS = oldState => async dispatch => {
  try {
    dispatch({
      type: UPDATE_COOKBOOKS_LS,
      payload: oldState
    });
  } catch (err) {
    dispatch({
      type: UPDATE_COOKBOOKS_LS_ERROR,
      payload: {
        msg: "server error from updateCookbooksLS",
        status: "server error"
      }
    });
  }
};

// add recipe/s to cookbooks
export const addRecipeToCookbook = data => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.put(`/api/cookbook/`, data, config);
    localStorage.removeItem("cookbookState");
    dispatch(getCookbooks())

    dispatch({
      type: ADD_RECIPE_TO_COOKBOOKS
    });

    dispatch(setAlert("Recipe Sucessfully Added", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: ADD_RECIPE_TO_COOKBOOKS_ERROR,
      payload: {
        msg: "server error from get addRecipeToCokbooks",
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
    localStorage.removeItem("cookbookState");
    dispatch(getCookbooks())
    dispatch({
      type: CREATE_COOKBOOK,
      payload: res.data
    });

    dispatch(setAlert("Recipe Sucessfully Added", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: CREATE_COOKBOOK_ERROR,
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
    localStorage.removeItem("cookbookState");
    dispatch(getCookbooks())
    dispatch(setAlert("Cookbook Deleted", "RecipeEditSuccess"));
  } catch (err) {
    dispatch({
      type: DELETE_COOKBOOK_ERROR,
      payload: {
        msg: "server error from get createCookbook",
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
    localStorage.removeItem("cookbookState");
    dispatch(getCookbooks())
    dispatch({
      type: RENAME_COOKBOOK,
      payload: res.data
    });

    dispatch(setAlert("cookbook Updated", "RecipeEditSuccess"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: RENAME_COOKBOOK_ERROR,
      payload: { msg: "renameCOokbook", status: "server error" }
    });
  }
};
