import { SEARCH, SEARCH_ERROR, GET_SEARCH_RECIPES } from "./types";
import axios from "axios";

export const getSearchRecipes = (searchParams, history) => async dispatch => {
  try {
    const config = {
      params: {
        search: searchParams
      }
    };
    localStorage.removeItem('searchState');
    const res = await axios.get("/api/recipe", config);

    let searchState = {
      searchRecipes: res.data,
      searchData: searchParams
    }
    console.log(searchState)

    localStorage.setItem('searchState', JSON.stringify(searchState));
    
    // will save all the searched recipes to the state
    dispatch({
      type: GET_SEARCH_RECIPES,
      payload: searchState
    });


    history.push(`/recipe/search`);
    // history.push('/d');
  } catch (err) {
    console.log(err)
    dispatch({
      type: SEARCH_ERROR,
      payload: { msg: "server error", status: "server error" }
    });

    // history.push(`/recipe`);
  }
};


export const updateFromSearchLS = (oldState) => async dispatch => {
  
  
  
  try {
    dispatch({
      type: 'UPDATE_SEARCH_LS',
      payload: oldState
    });

    
 
  } catch (err) {
    dispatch({
      type: 'UPDATE_LS_ERROR',
      payload: { msg: "server error", status: "server error" }
    });

   
  }
};