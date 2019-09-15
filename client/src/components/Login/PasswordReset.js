import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import backgroundImage from "../../images/background.jpg";
import Alert from "../Layout/contentContainer/alert/alert";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { setAlert, clearAlerts } from "../../actions/alert";
import {  clearLS, passwordReset } from "../../actions/auth";
import "./login.css";

const PasswordReset = props => {
  const {  login, setAlert, clearAlerts, clearLS, passwordReset, match, history} = props;

  const initialData = {
    
    password: "",
    password2: ""
  };
  
  const [formData, setFormData] = useState(initialData);
  const {  password, password2 } = formData;
  const [isLogin, setIsLogin] = useState(true);



   const handleRegister = e => {
    e.preventDefault();
    setIsLogin()
   
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== password2){
      
      clearAlerts();
      setAlert("Your passwords are not the same", 'LoginDanger')
    }

    else{

      // need to invalidate token
      // check the password is more than 8 characters
    
    passwordReset({password:password, password_token: match.params.password_token}, history)
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  useEffect(() => {
    clearLS();
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
          <form className="loginForm" onSubmit={handleSubmit}>
            <h1 className="LoginLogo signIn">Kitchen Catalogue</h1>
            <h2>Please Enter Your New Password</h2>
            <input
              className="loginInput"
              type="password"
              placeholder="Password "
              name="password"
              value={password}
              onChange={handleChange}
            />
            <input
              className="loginInput"
              type="password"
              placeholder="please re-enter your password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
            <div className="loginButtonContainer">
              <button className="loginButton">Submit</button>
              
            </div>

            <p className="loginP signInP">
              Press {" "}
              <Link exact to='/login'>
              <span  className=" blue" id="span_register">
                {" "}
                here
              </span>{" "}</Link>
              to go back to the login page.
            </p>
          </form>
        </div>

        <div
          className={`loginForm-container loginSign-in-container ${
            isLogin ? "opacity" : ""
          }`}
        >
          <form className="loginForm" onSubmit={handleRegister}>
            {/* <h1 className="LoginLogo register">Kitchen Catalogue</h1>
            <h2 className="register">Create Account</h2>
            <input
              className="loginInput"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <input
              className="loginInput"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <input
              className="loginInput"
              type="password"
              placeholder="Please re-enter password"
              name="password2"
              value={password2}
              onChange={handleChange}
            />
            <button className="loginButton">Sign Up</button>
            <p className="register loginP">
              Already a member? Press{" "}
              <span onClick={handleClick} className=" blue" id="span_login">
                {" "}
                here{" "}
              </span>
              to continue to Kitchen Catalogue
            </p> */}
          </form>
        </div>

        <div className="loginOverlay-container">
          <div className="loginOverlay">
            <div className="loginOverlay-panel loginOverlay-left">
              <h1 className="pacifico">Kitchen Catalogue</h1>
              <p className="loginP">Welcome to Kitchen Catalogue!</p>
              <p className="loginP">Please enter your details to login</p>
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

PasswordReset.propTypes = {
  setAlert: PropTypes.func.isRequired,

  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert,  clearAlerts, clearLS, passwordReset }
)(PasswordReset);
