import {
  GET_RECIPES,
  GET_RECIPES_ERROR,
  UPDATE_RECIPES_LS,
  UPDATE_RECIPES_LS_ERROR,
  CLEAR_RECIPE,
  CLEAR_ERROR
} from "../actions/types";

const initialState = {
  recipes: [],
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

    case CLEAR_RECIPE:
      return {
        ...state,
        loading: true
      };
  
    case UPDATE_RECIPES_LS:
      return {
        ...state,
        recipes: payload,
        loading: false
      };

    case GET_RECIPES_ERROR, UPDATE_RECIPES_LS_ERROR, CLEAR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

      
    default:
      return state;
  }
}
