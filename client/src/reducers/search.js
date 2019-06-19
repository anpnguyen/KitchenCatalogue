import {
    SEARCH,SEARCH_ERROR
    
  } from '../actions/types'
  
 
  
  const initialState = {
    searchData:[],
    loading: true,
    error: {}
    };
  
    export default function(state = initialState, action) {
      const { type, payload } = action;
        
      switch (type) {
        case SEARCH:
          return {
            ...state,
            searchData: payload,
            loading: false
          }
  
        case SEARCH_ERROR:
          return {
            ...state,
            error:payload,
            loading: false
          }
          default:
            return state    
    } 
}