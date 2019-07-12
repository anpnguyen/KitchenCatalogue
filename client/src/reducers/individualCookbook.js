import {
    
    LOAD_COOKBOOK_RECIPES, GET_COOKBOOK
     } from "../actions/types";
     
     // import {Redirect} from 'react-router-dom'
     
     const initialState = {
       individualCookbook: {},
       loading: true,
       error: {}
     };
     
     export default function(state = initialState, action) {
       const { type, payload } = action;
     
       switch (type) {
         
         case  LOAD_COOKBOOK_RECIPES:
           return {
             ...state,
             individualCookbook: payload,
             loading: false
           };

           case  GET_COOKBOOK:
           return {
             ...state,
             individualCookbook: payload,
             loading: false
           };
     
     
     
         default:
           return state;
       }
     }
     