import {
  GET_RECIPE,
  RECIPE_ERROR,
  CREATE_RECIPE,
  GET_RECIPES,
  CLEAR_RECIPE,
  EDIT_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPES_LS
} from "../actions/types";

// import {Redirect} from 'react-router-dom'

const initialState = {
  recipes: [],
  recipe: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        loading: false
      };

    case RECIPE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };

    case CLEAR_RECIPE:
      return {
        ...state,
        loading: true
      };

    case CREATE_RECIPE:
      return {
        ...state,
        loading: false
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
    case UPDATE_RECIPES_LS:
      return {
        ...state,
        recipes: payload,
        loading: false
      };

    default:
      return state;
  }
}
