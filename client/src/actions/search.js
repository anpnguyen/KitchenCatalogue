import {SEARCH, SEARCH_ERROR} from './types'

export const searchRecipes = (searchData, history) => async dispatch => {
    try {         
                
        dispatch({
            type: SEARCH,
            payload: searchData
        });
        
        history.push(`/recipe/search`)

                      
        
    } catch (err) {
      
       console.log(err)
          
        dispatch({
            type: SEARCH_ERROR,
            payload: { msg: "create profile error ", status: "server error"}
          });
        
    }
};