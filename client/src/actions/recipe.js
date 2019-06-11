import axios from 'axios'

import{
    GET_RECIPES,  
    GET_RECIPE,
    RECIPE_ERROR,
    CLEAR_RECIPE,
    CLEAR_ERROR    

} from '../actions/types'




// GET the logged in users profile
export const getRecipes = () => async dispatch => {
    try {
        
        const res = await axios.get('http://localhost:5000/api/recipe')
        
        dispatch({
            type: GET_RECIPES,
            payload: res.data
          });

    } catch (err) {
        
        console.log("catch error or no profile")
        dispatch({
            type: RECIPE_ERROR,
            payload: { msg: "server error", status: "server error"}
          });
    }
}

export const clearRecipe = () => async dispatch => {
    try {
                
        dispatch({
            type: CLEAR_RECIPE
           
          });

    } catch (err) {
        
        console.log("catch error or no profile")
        dispatch({
            type: CLEAR_ERROR,
            payload: { msg: "server error", status: "server error"}
          });
    }
};

export const getRecipeById = recipeId => async dispatch => {
    try {
        
        const res = await axios.get(`http://localhost:5000/api/recipe/${recipeId}`)
        
        dispatch({
            type: GET_RECIPE,
            payload: res.data
          });

    } catch (err) {
        
        console.log("catch error or no profile")
        dispatch({
            type: RECIPE_ERROR,
            payload: { msg: "server error", status: "server error"}
          });
    }
};

// create Recipe

// edit Recipe






