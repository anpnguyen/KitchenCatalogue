import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_USER
} from "./types";
import { setAlert, clearAlerts } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

//  *** LOAD A USER  ***
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/authUser");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// *** REGISTER A USER ***
export const register = (
  { username, email, password },
  resetState
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ username, email, password });
  try {
    const res = await axios.post("/api/registerUser", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert(res.data.msg, "RecipeEditSuccess"));

    resetState();
  } catch (err) {
    if (err) {
      const errors = err.response.data.errors;
      dispatch(clearAlerts());
      errors.forEach(error => dispatch(setAlert(error.msg, "LoginDanger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
// *** LOGIN a user ***

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/authUser", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(clearAlerts());
      errors.forEach(error => dispatch(setAlert(error.msg, "LoginDanger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// *** Confirm a users email ***
export const confirmUser = register_token => async dispatch => {
  const res = await axios.get(
    `/api/registerUser/${register_token.register_token}`
  );
  dispatch({ type: "EMAIL_VERIFIED" });
  dispatch(setAlert(res.data.msg, "RecipeEditSuccess"));
};

// *** Send password reset email ***
export const passwordResetEmail = (email, resetState) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const res = await axios.post(`/api/authUser/forgot`, email, config);

    dispatch(setAlert(res.data.msg, "RecipeEditSuccess"));
    dispatch({ type: "PASSWORD_RESET_SENT" });
    resetState();
  } catch (err) {
    err && dispatch(setAlert(err.response.data.msg, "LoginDanger"));
    dispatch({ type: "PASSWORD_RESET_ERROR" });
  }
};

// *** Reset a users password ***
export const passwordReset = (data, history) => async dispatch => {
  const { password_token } = data;

  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.post(`/api/authUser/forgot/${password_token}`, data, config);
    dispatch(setAlert("Password successfully changed", "RecipeEditSuccess"));
    dispatch({ type: "PASSWORD_RESET" });

    history.push("/login");
  } catch (err) {
    let errors = err.response.data.errors;
    errors.map(err => dispatch(setAlert(err.msg, "LoginDanger")));
  }
};

// *** Resend the confirmation email ***

export const resendConfirmation = (email, resetState) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post(
      `/api/registerUser/resendConfirmation`,
      email,
      config
    );

    dispatch(setAlert(res.data.msg, "RecipeEditSuccess"));
    resetState();
  } catch (err) {
    dispatch(clearAlerts());
    dispatch(setAlert(err.response.data.msg, "LoginDanger"));
    dispatch({
      type: "RESEND_ERROR"
    });
  }
};

//  *** LOGOUT ***
export const logout = () => dispatch => {
  dispatch({
    type: CLEAR_USER
  });
  dispatch({
    type: LOGOUT
  });
  localStorage.removeItem("recipeState");
  localStorage.removeItem("cookbookState");
  localStorage.removeItem("searchState");
};
export const clearLS = () => dispatch => {
  localStorage.removeItem("recipeState");
  localStorage.removeItem("cookbookState");
  localStorage.removeItem("searchState");
};
