import { SEARCH, SEARCH_ERROR, GET_SEARCH_RECIPES } from "./types";
import axios from 'axios'

// export const searchRecipes = (searchData, history) => async dispatch => {
//   try {
//     dispatch({
//       type: SEARCH,
//       payload: searchData
//     });

    

//   } catch (err) {
//     console.log(err);

//     dispatch({
//       type: SEARCH_ERROR,
//       payload: { msg: "create profile error ", status: "server error" }
//     });
//   }
// };

export const getSearchRecipes = (searchParams,history) => async dispatch => {
  try {
    const config = {
      params: {
        search: searchParams
      }
    };

    const res = await axios.get("/api/recipe", config);

    dispatch({
      type: GET_SEARCH_RECIPES,
      payload: res.data

    });

    dispatch({
            type: SEARCH,
            payload: searchParams
          });

    history.push(`/recipe/search`);
  } catch (err) {
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: "server error", status: "server error" }
    });
  }
};
