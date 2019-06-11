import {
  GET_RECIPE, 
  RECIPE_ERROR,
  // CLEAR_USER,
  // CREATE_PROFILE,
  // EDIT_PROFILE,
  GET_RECIPES,
  CLEAR_RECIPE
} from '../actions/types'

const initialState = {
    recipes:[],
    recipe:{},
    loading: true,
    error: {}
  };

  export default function(state = initialState, action) {
    const { type, payload } = action;
  
    
    switch (type) {
      case GET_RECIPES:
        // console.log(action.payload)
        return {
          ...state,
          recipes: payload,
          loading: false
        }
        case RECIPE_ERROR:
        return {
          ...state,
          error:payload,
          loading: false
        }

      case GET_RECIPE:
        return{
          ...state,
          recipe: payload,
          loading:false

        }

      case CLEAR_RECIPE:
        return{
          ...state,
          loading:true
        }
  

        // case CLEAR_USER:
        // return {
        //   ...state,
        //   user: null,
        //   profile: null
          
        // }

        // case GET_PROFILES:
        //   return{
        //     ...state,
        //     profiles: action.payload,
        //     loading: false
        //   }
    
        default:
            return state    
    } 
}