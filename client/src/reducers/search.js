import { SEARCH, SEARCH_ERROR, GET_SEARCH_RECIPES } from "../actions/types";

const initialState = {
  searchData: [],
  searchRecipes:[],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case SEARCH:
    //   return {
    //     ...state,
    //     searchData: payload,
    //     loading: false
    //   };

    case SEARCH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

      case GET_SEARCH_RECIPES:
      return {
        ...state,
        searchRecipes: payload.searchRecipes,
        searchData: [payload.searchData],
        loading: false
      };
      case 'UPDATE_SEARCH_LS':
      return {
        ...state,
        searchRecipes: payload.searchRecipes,
        searchData: [payload.searchData],
        loading: false
      };
    default:
      return state;
  }
}
