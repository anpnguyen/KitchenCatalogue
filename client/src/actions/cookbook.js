import axios from "axios";
// import { setAlert } from "../actions/alert";

import {
    GET_COOKBOOKS,
    GET_COOKBOOKS_ERROR
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