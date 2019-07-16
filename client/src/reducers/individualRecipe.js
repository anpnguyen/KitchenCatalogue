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
} from "../actions/types";

// import {Redirect} from 'react-router-dom'

const initialState = {
  recipe: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };
    case UPDATE_RECIPE_LS:
      return {
        ...state,
        recipe: payload,
        loading: false
      };

    case CREATE_RECIPE:
      return {
        ...state,
        loading: true
      };
    case EDIT_RECIPE:
      return {
        ...state,
        loading: true
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipe: "",
        loading: true
      };
    case GET_RECIPE_ERROR,UPDATE_RECIPE_LS_ERROR,CREATE_RECIPE_ERROR,DELETE_RECIPE_ERROR, EDIT_RECIPE_ERROR:
      return {
        ...state,
        loading: false
      };


    default:
      return state;
  }
}
