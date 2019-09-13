import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import backgroundImage from "../../images/background.jpg";
import Alert from "../Layout/alert";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert, clearAlerts } from "../../actions/alert";
import {
  login,
  register,
  clearLS,
  confirmUser,
  passwordResetEmail,
  resendConfirmation
} from "../../actions/auth";
import "./login.css";

const Login = props => {
  const {
    register,
    login,
    setAlert,
    clearAlerts,
    clearLS,
    match,
    confirmUser,
    passwordResetEmail,    
    resendConfirmation
  } = props;

  const initialData = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialData);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResendConfirmation, setIsResendConfirmation] = useState(false);
  const { username, email, password, password2 } = formData;

  const handleClick = () => {
    setFormData(initialData);
    setIsLogin(!isLogin);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    login({ email, password });
  };


  const resetState = ()=>{
    setIsLogin(true);
    setFormData(initialData);
    setIsForgotPassword(false);
    setIsResendConfirmation(false)
  }

  const handleRegister = e => {
    e.preventDefault();
    if (password !== password2) {
      clearAlerts();
      setAlert("Passwords to not match", "LoginDanger");
    } else {
      register({ username, email, password }, resetState);
    }
  };

  

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(!isForgotPassword);
  };

  const handlePasswordResetClick = e => {
    e.preventDefault();

    if (email) {
      passwordResetEmail({ email: email },resetState);
    } else {
      clearAlerts();
      setAlert("Please enter an email address", "LoginDanger");
    }
  };

  const handleResendEmail = e => {
    e.preventDefault();
    email ? resendConfirmation({ email: email },resetState) : clearAlerts();
    setAlert("Please enter an email address", "LoginDanger");
  };

 

  useEffect(() => {
    clearLS();
  }, []);

  useEffect(() => {
    match.params.register_token &&
      confirmUser({ register_token: match.params.register_token });
    
  }, []);

  if (props.isAuthenticated) {
    return <Redirect to="/recipe" />;
  }

  let style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto 100%"
  };

  return (
    <div className="login" style={style}>
      <Alert />

      <div
        className={`loginContainer ${isLogin ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="loginForm-container loginSign-up-container">
          <form className="loginForm" onSubmit={handleLogin}>
            <h1 className="LoginLogo signIn">Kitchen Catalogue</h1>
            <h2>{!isForgotPassword ? "Sign in" : "Password Reset"}</h2>
            <input
              className="loginInput"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {!isForgotPassword && (
              <input
                className="loginInput"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            )}
            <div className="loginButtonContainer">
              {!isForgotPassword ? (
                <>
                  <button className="loginButton">Sign In</button>
             
                </>
              ) : (
                <button
                  className="loginButton"
                  onClick={handlePasswordResetClick}
                >
                  Reset
                </button>
              )}
            </div>

            {!isForgotPassword && (
              <p className="loginP signInP">
                Not a member? Press{" "}
                <span
                  onClick={handleClick}
                  className=" blue"
                  // id="span_register"
                >
                  {" "}
                  here
                </span>{" "}
                to create an account.
              </p>
            )}

            {isForgotPassword ? (
              <p className="loginP signInP">
                Press{" "}
                <span
                  onClick={handleForgotPasswordClick}
                  className=" blue"
                  // id="span_register"
                >
                  {" "}
                  here
                </span>{" "}
                to return to login page
              </p>
            ) : (
              <p className="loginP signInP">
                Forgot your password? Press{" "}
                <span
                  onClick={handleForgotPasswordClick}
                  className=" blue"
                  // id="span_register"
                >
                  {" "}
                  here
                </span>{" "}
                to reset your password
              </p>
            )}
          </form>
        </div>

        <div
          className={`loginForm-container loginSign-in-container ${
            isLogin ? "opacity" : ""
          }`}
        >
          <form className="loginForm" onSubmit={handleRegister}>
            <h1 className="LoginLogo register">Kitchen Catalogue</h1>
            <h2 className="register">
              {isResendConfirmation
                ? "Resend Confirmation Email"
                : "Create Account"}
            </h2>
            {!isResendConfirmation && (
              <input
                className="loginInput"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            )}
            <input
              className="loginInput"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {!isResendConfirmation && (
              <>
              
                <input
                  className="loginInput"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  id='password'
                />
                <input
                  className="loginInput"
                  type="password"
                  placeholder="Please re-enter password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </>
            )}
            {!isResendConfirmation ? (
              <button className="loginButton">Sign Up</button>
            ) : (
              <button className="loginButton" onClick={handleResendEmail}>
                Resend
              </button>
            )}

            {!isResendConfirmation && (
              <p className="register loginP">
                Already a member? Click{" "}
                <span onClick={handleClick} className=" blue" 
                // id="span_login"
                >
                  {" "}
                  here{" "}
                </span>
                to login.
              </p>
            )}
            {!isResendConfirmation ? (
              <p className="register loginP">
                Didn't recieve your confirmation email? Click{" "}
                <span
                  onClick={() => setIsResendConfirmation(!isResendConfirmation)}
                  className=" blue"
                  // id="span_login"
                >
                  {" "}
                  here{" "}
                </span>
                to resend confirmation email.
              </p>
            ) : (
              <p className="register loginP">
                Click{" "}
                <span
                  onClick={() => setIsResendConfirmation(!isResendConfirmation)}
                  className=" blue"
                  // id="span_login"
                >
                  {" "}
                  here{" "}
                </span>
                to return to create account.
              </p>
            )}
          </form>
        </div>

        <div className="loginOverlay-container">
          <div className="loginOverlay">
            <div className="loginOverlay-panel loginOverlay-left">
              <h1 className="pacifico">Kitchen Catalogue</h1>
              <p className="loginP">
                Welcome to Kitchen Catalogue! An online database for all your
                custom cooking recipes.
              </p>
            </div>
            <div
              className={`loginOverlay-panel loginOverlay-right ${
                login ? "right-panel-active" : ""
              } `}
            >
              <h1 className="pacifico">Kitchen Catalogue</h1>
              <p className="loginP">
                Please enter your details for a free account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    setAlert,
    register,
    login,
    clearAlerts,
    clearLS,
    confirmUser,
    passwordResetEmail,
    resendConfirmation
  }
)(Login);
