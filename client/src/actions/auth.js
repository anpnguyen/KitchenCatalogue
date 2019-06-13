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
import {setAlert, clearAlerts} from './alert'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'


//  *** LOAD A USER  ***
export const loadUser = () => async dispatch =>{
  // if there is a token in local storage, set it as out axios header
  if(localStorage.token){
    setAuthToken(localStorage.token);
  }
  // then make a request to see if the token is valid
  try{
    const res = await axios.get('http://localhost:5000/api/authUser');
    dispatch({
      type:USER_LOADED,
      payload: res.data
    })
    console.log(res.data)
  }
  catch(err){
    dispatch({
      type:AUTH_ERROR
    })
  }
}

// *** REGISTER A USER ***
export const register = ({ username, email, password }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ username, email, password });
    try {
      const res = await axios.post('http://localhost:5000/api/registerUser', body, config);
      
      // response will be a token, which register success will set in localStorage and set as state
      // set authentication as true
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      // loadUser will set the axios header
      dispatch(loadUser());
    } catch (err) {
      //  err is the name i gave t
      // response.data is the axios response and the data object
      // errors is the name of  object given from the back end
      const errors = err.response.data.errors;
      
      // if there are any errors, they will activate set Alert
      if (errors) {
        dispatch(clearAlerts())
        errors.forEach(error => dispatch(setAlert(error.msg, 'LoginDanger')));
      }
      
      // register fail will clear local storage of token 
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };
    // *** LOGIN a user ***

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const body = JSON.stringify({ email, password });
      
  try {
    const res = await axios.post('http://localhost:5000/api/authUser', body, config);
        
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  
    dispatch(loadUser());

  } catch (err) {
                
    const errors = err.response.data.errors;
      
    // if there are errors, then for each one, run the function 'setAlert' with each error in err.response.data.errors
    if (errors) {
      dispatch(clearAlerts())
      errors.forEach(error => dispatch(setAlert(error.msg, 'LoginDangerg')));
    }
  
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//  *** LOGOUT *** 
export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_USER
  })
  dispatch({
    type: LOGOUT
  })
}