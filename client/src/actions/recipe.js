// import React from 'react';
import axios from 'axios'
import {setAlert} from '../actions/alert'
// import {withRouter} from 'react-router-dom'

import{
    GET_RECIPES,  
    GET_RECIPE,
    RECIPE_ERROR,
    CLEAR_RECIPE,
    CLEAR_ERROR,
    CREATE_RECIPE,
    // CREATE_RECIPE_ERROR,    
    EDIT_RECIPE,    
    // EDIT_RECIPE_ERROR,
    DELETE_RECIPE,
    // DELETE_RECIPE_ERROR,
    RECIPE_ADD_FAVOURITE    

} from '../actions/types'


// GET the all the users recipes
export const getRecipes = (searchParams) => async dispatch => {
    try {
        const config = {
            params: {
              'search': searchParams
            }
          };
        console.log(searchParams)

        const res = await axios.get('http://localhost:5000/api/recipe', config)
        
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


// Clear Recipe from State
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

// **** Get an individual RECIPE
export const getRecipeById = (recipeId,history) => async dispatch => {
    try {
        
        const res = await axios.get(`http://localhost:5000/api/recipe/${recipeId}`)
        
        // console.log(res.data)

        dispatch({
            type: GET_RECIPE,
            payload: res.data
          });

        

        //   thi sneed to get fixed so it redirects
    } catch (err) {
        
        dispatch({
            type: CLEAR_RECIPE
        })

        history.push('/home')

    }
};

// create Recipe

export const createRecipe = (formData, history) => async dispatch => {
    try {
                   
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        
        // const body = JSON.stringify({ formData});
        
        
        const res = await axios.post('http://localhost:5000/api/recipe', formData, config)
        
        // console.log(res.data)

        dispatch({
            type: CREATE_RECIPE,
            payload: res.data
        });

        dispatch(setAlert ( "Recipe Created", "RecipeEditSuccess"
        ));

        dispatch({
            type: CLEAR_RECIPE,
            payload: res.data
        });
       
        history.push(`/recipe/${res.data._id}`)
                    
        
    } catch (err) {
  
       
        const errors = err.response.data.errors ;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'LoginDanger')))
            };

        dispatch({
            type: RECIPE_ERROR,
            payload: { msg: "create profile error ", status: "server error"}
          });
        
    }
};


export const editRecipePut = (formData, history, recipeId) => async dispatch => {
    try {
                   
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        
            
        
        const res = await axios.put(`http://localhost:5000/api/recipe/${recipeId}`, formData, config)
        console.log('put request')
        console.log(res.data)

        dispatch({
            type: EDIT_RECIPE,
            payload: res.data
        });

        dispatch(setAlert ( "Recipe Sucessfully Edited", "RecipeEditSuccess"
        ));

        history.push(`/recipe/${recipeId}`)

                      
        
    } catch (err) {
        // console.log(err)
        // console.log(err.response)
        console.log("error in sending create recipe")
       
        const errors = err.response.data ;
        console.log(errors)
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, error.errorType)))
            };

        dispatch({
            type: RECIPE_ERROR,
            payload: { msg: "create profile error ", status: "server error"}
          });
        
    }
};

// Delete A Recipe


export const deleteRecipe = (history, recipeId) => async dispatch => {
    try {         
        
        await axios.delete(`http://localhost:5000/api/recipe/${recipeId}`)
        
        // console.log(res.data)

        dispatch({
            type: DELETE_RECIPE,
        });

        dispatch(setAlert ( "Recipe Sucessfully Deleted", "RecipeEditSuccess"
        ));

        history.push(`/home`)

                      
        
    } catch (err) {
        console.log(err)
        console.log("error in deleting recipe")
       
        // const errors = err.response.data.errors ;
        //     if (errors) {
        //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        //     };
        
        dispatch({
            type: RECIPE_ERROR,
            payload: { msg: "create profile error ", status: "server error"}
          });
        
    }
};



// export const deleteRecipe = (history, recipeId) => async dispatch => {
//     try {         
             
              
        
//         await axios.post(`http://localhost:5000/api/recipe/${recipeId}/delete`)
        
//         // console.log(res.data)

//         dispatch({
//             type: DELETE_RECIPE,
//         });

//         dispatch(setAlert ( "Recipe Sucessfully Deleted", "RecipeEditSuccess"
//         ));

//         history.push(`/home`)

                      
        
//     } catch (err) {
//         console.log(err)
//         console.log("error in deleting recipe")
       
//         // const errors = err.response.data.errors ;
//         //     if (errors) {
//         //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         //     };

//         dispatch({
//             type: DELETE_RECIPE_ERROR,
//             payload: { msg: "create profile error ", status: "server error"}
//           });
        
//     }
// };




export const addRecipeToFavourites = (recipeId) => async dispatch => {
    try {
     
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };


        let res = await axios.put(`http://localhost:5000/api/recipe/favourite`, recipeId  ,config)
        
        console.log("recipe added to favourite")

        dispatch({
            type: RECIPE_ADD_FAVOURITE,
            payload: res.data
        });

        dispatch(setAlert ( "Recipe Sucessfully Deleted", "success"
        ));

        // history.push(`/recipe`)

                      
        
    } catch (err) {
        console.log(err)
        console.log("error in ading favourite recipe")
       
        // const errors = err.response.data.errors ;
        //     if (errors) {
        //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        //     };

        // dispatch({
        //     type: DELETE_RECIPE_ERROR,
        //     payload: { msg: "create profile error ", status: "server error"}
        //   });
        
    }
};