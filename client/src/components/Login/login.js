import React, { useState } from "react";
import PropTypes from "prop-types";
import backgroundImage from "../../images/background.jpg";
import Alert from "../Layout/alert";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert, clearAlerts } from "../../actions/alert";
import { login, register } from "../../actions/auth";
import "./login.css";

const Login = (props) => {
  const { register, login, setAlert, clearAlerts } = props;

  const initialData = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState(initialData);
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

  const handleRegister = e => {
    e.preventDefault();
    if (password !== password2) {
      clearAlerts();
      setAlert("Passwords to not match", "LoginDanger");
    } else {
      register({ username, email, password });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/recipe" />;
  }

  let style={
    backgroundImage : `url(${backgroundImage})`,
    backgroundSize: 'cover',

  }

  return (
    <div className="login" style={style}>
      <Alert />
      {/* <img src={backgroundImage} alt="" draggable="false" role="presentation" /> */}
      <div
        className={`loginContainer ${isLogin ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="loginForm-container loginSign-up-container">
          <form className="loginForm" onSubmit={handleLogin}>
            <h1 className="LoginLogo signIn">Kitchen Catalogue</h1>
            <h2>Sign in</h2>
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
            <button className="loginButton">Sign In</button>
            <p className="loginP signInP">
              Not a member? Press{" "}
              <span onClick={handleClick} className=" blue" id="span_register">
                {" "}
                here
              </span>{" "}
              to register
            </p>
          </form>
        </div>

        <div
          className={`loginForm-container loginSign-in-container ${
            isLogin ? "opacity" : ""
          }`}
        >
          <form className="loginForm" onSubmit={handleRegister}>
            <h1 className="LoginLogo register">Kitchen Catalogue</h1>
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
            </p>
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
}

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
  { setAlert, register, login, clearAlerts }
)(Login);
