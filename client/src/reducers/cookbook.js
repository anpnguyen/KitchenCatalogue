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


const initialState = {
  cookbooks: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COOKBOOKS:
      return {
        ...state,
        cookbooks: payload,
        loading: false
      };

    case UPDATE_COOKBOOKS_LS:
      return {
        ...state,
        cookbooks: payload,
        loading: false
      };

    case CREATE_COOKBOOK:
      return {
        ...state,
        cookbooks: [...state.cookbooks, payload],
        loading: false
      };

    case DELETE_COOKBOOK:
      return {
        ...state,
        cookbooks: [
          ...state.cookbooks.filter(cookbook => cookbook._id !== payload)
        ],
        loading: false
      };

    case RENAME_COOKBOOK:
      return {
        ...state,
        cookbooks: state.cookbooks.map(mappedCookbook => {
          if (mappedCookbook._id === payload._id) {
            return payload;
          } else {
            return mappedCookbook;
          }
        }),
        loading: false
      };

    case GET_COOKBOOKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_COOKBOOKS_LS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CREATE_COOKBOOK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_COOKBOOK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case RENAME_COOKBOOK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_RECIPE_TO_COOKBOOKS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_RECIPE_TO_COOKBOOKS:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
}
