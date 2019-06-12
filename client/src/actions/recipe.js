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
    CREATE_RECIPE_ERROR,    
    EDIT_RECIPE,    
    EDIT_RECIPE_ERROR,
    DELETE_RECIPE,
    DELETE_RECIPE_ERROR    

} from '../actions/types'




// GET the all the users recipes
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

// Get Recipes Set
export const getSetRecipes = (setNumber) => async dispatch => {
    try {
        
        const res = await axios.get(`http://localhost:5000/api/recipe/set/${setNumber}`)
        
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
        // if(err){
        //     return(<Redirect to='/'>)
        // }
        dispatch({
            type: CLEAR_ERROR,
            payload: { msg: "server error", status: "server error"}
          });
    }
};

// **** Get an individual RECIPE
export const getRecipeById = recipeId => async dispatch => {
    try {
        
        const res = await axios.get(`http://localhost:5000/api/recipe/${recipeId}`)
        
        dispatch({
            type: GET_RECIPE,
            payload: res.data
          });

        //   thi sneed to get fixed so it redirects
    } catch (err) {
        
        dispatch({
            type: CLEAR_RECIPE
        })

        
        console.log("catch error or no profile")
        // dispatch({
        //     type: RECIPE_ERROR,
        //     payload: { msg: "server error", status: "server error"}
        //   });
           
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
        
        console.log(res.data)

        dispatch({
            type: CREATE_RECIPE,
            payload: res.data
        });

        dispatch(setAlert ( "Recipe Created", "success"
        ));

        dispatch({
            type: CLEAR_RECIPE,
            payload: res.data
        });
       
        history.push(`/recipe/${res.data._id}`)
                    
        
    } catch (err) {
        console.log(err)
        console.log(err.response)
        console.log("error in sending create recipe")
       
        const errors = err.response.data.errors ;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
            };

        dispatch({
            type: CREATE_RECIPE_ERROR,
            payload: { msg: "create profile error ", status: "server error"}
          });
        
    }
};

// edit Recipe


// export const editRecipe = (formData, history, recipeId) => async dispatch => {
//     try {
                   
//         const config = {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           };
        
//         // const body = JSON.stringify({ formData});
        
        
//         const res = await axios.post(`http://localhost:5000/api/recipe/${recipeId}/edit`, formData, config)
        
//         console.log(res.data)

//         dispatch({
//             type: EDIT_RECIPE,
//             payload: res.data
//         });

//         dispatch(setAlert ( "Recipe Sucessfully Edited", "success"
//         ));

                      
        
//     } catch (err) {
//         // console.log(err)
//         // console.log(err.response)
//         console.log("error in sending create recipe")
       
//         // const errors = err.response.data.errors ;
//         //     if (errors) {
//         //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         //     };

//         dispatch({
//             type: EDIT_RECIPE_ERROR,
//             payload: { msg: "create profile error ", status: "server error"}
//           });
        
//     }
// };


export const editRecipePut = (formData, history, recipeId) => async dispatch => {
    try {
                   
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
        
        // const body = JSON.stringify({ formData});
        
        
        const res = await axios.put(`http://localhost:5000/api/recipe/${recipeId}`, formData, config)
        console.log('put request')
        console.log(res.data)

        dispatch({
            type: EDIT_RECIPE,
            payload: res.data
        });

        dispatch(setAlert ( "Recipe Sucessfully Edited", "success"
        ));

                      
        
    } catch (err) {
        // console.log(err)
        // console.log(err.response)
        console.log("error in sending create recipe")
       
        // const errors = err.response.data.errors ;
        //     if (errors) {
        //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        //     };

        dispatch({
            type: EDIT_RECIPE_ERROR,
            payload: { msg: "create profile error ", status: "server error"}
          });
        
    }
};

// Delete A Recipe


export const deleteRecipe = (history, recipeId) => async dispatch => {
    try {
                   
             
              
        
        await axios.post(`http://localhost:5000/api/recipe/${recipeId}/delete`)
        
        // console.log(res.data)

        dispatch({
            type: DELETE_RECIPE,
        });

        dispatch(setAlert ( "Recipe Sucessfully Deleted", "success"
        ));

        history.push(`/recipe`)

                      
        
    } catch (err) {
        console.log(err)
        console.log("error in deleting recipe")
       
        // const errors = err.response.data.errors ;
        //     if (errors) {
        //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        //     };

        dispatch({
            type: DELETE_RECIPE_ERROR,
            payload: { msg: "create profile error ", status: "server error"}
          });
        
    }
};


