import {
 GET_COOKBOOKS,
 GET_COOKBOOKS_ERROR,
 UPDATE_COOKBOOKS,
 CREATE_COOKBOOK
 
  } from "../actions/types";
  
  // import {Redirect} from 'react-router-dom'
  
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
        
      case GET_COOKBOOKS_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      
        case CREATE_COOKBOOK:
          return {
            ...state,
            cookbooks: [...state.cookbooks, payload],
            
            loading: false
          };
  
  
      default:
        return state;
    }
  }
  