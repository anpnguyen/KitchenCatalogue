import {
    
    LOAD_COOKBOOK_RECIPES, GET_COOKBOOK, GET_COOKBOOK_ERROR, REMOVE_RECIPE
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


           case REMOVE_RECIPE:
          return {
            ...state,
            individualCookbook: {...state.individualCookbook, savedRecipes: state.individualCookbook.savedRecipes.filter(recipe => recipe._id !== payload.recipeDeleted)},
            
            loading: false
          };

     
     
         default:
           return state;
       }
     }
     