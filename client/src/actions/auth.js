import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_USER
  } from './types'
import {setAlert} from './alert'

import setAuthToken from '../utils/setAuthToken'

import axios from 'axios'



// LOAD A USER USER

export const loadUser = () => async dispatch =>{
  // if there is a token in local storage, set it as out axios header
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }

  try{
    const res = await axios.get('http://localhost:5000/api/authUser');
    dispatch({
      type:USER_LOADED,
      payload: res.data
    })
  }
  catch(err){
    dispatch({
      type:AUTH_ERROR
    })
  }
}

// REGISTER ACTION
export const register = ({ username, email, password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ username, email, password });
  
    try {
      const res = await axios.post('http://localhost:5000/api/registerUser', body, config);
  
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

 
      dispatch(loadUser());
    } catch (err) {
        // console.log(err)
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };
  


  // LOGIN a user

  export const login = ({ email, password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    const body = JSON.stringify({ email, password });
    // console.log(body)
  
    try {
      const res = await axios.post('http://localhost:5000/api/authUser', body, config);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });


  
      dispatch(loadUser());

    // this err comes from axios - it is an object
    } catch (err) {
        
        // this e
      const errors = err.response.data.errors;
      
      // if there are errors, then for each one, run the function 'setAlert' with each error in err.response.data.errors
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
      }
  
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };

//  Logout 
  export const logout = () => dispatch => {
    dispatch({
      type: CLEAR_USER
    })
    dispatch({
      type: LOGOUT
    })
  }