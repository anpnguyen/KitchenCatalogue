
import {GET_FAVOURITES} from './types'
// import uuid from 'uuid/v4'

import axios from 'axios'


export const getFavourites = (userId) => async dispatch => {
    try {
     
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };

        let res = await axios.get(`http://localhost:5000/api/recipe/favourite`, userId  ,config)
        
        // console.log("recipe added to favourite")

        dispatch({
            type: GET_FAVOURITES,
            payload: res.data
        });

        // dispatch(setAlert ( "Recipe Sucessfully Deleted", "success"
        // ));

      

                      
        
    } catch (err) {
        console.log(err)
        console.log("error in ading favourite recipe")
       
   
        
    }
};