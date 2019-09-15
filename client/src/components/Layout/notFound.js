import React from "react";
import NavBar from "./contentContainer/navBar/navBar";
import { Link } from "react-router-dom";
import "./notFound.css";
import notFound from "../../images/404.jpg";

const NotFound = props => {
  return (
    <div className="notFoundContainer">
      <NavBar />
      <div
        className="notFound"
        style={{
          backgroundImage: `url(${notFound})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="notFoundDark">
          <h1>Whoops, something went wrong!</h1>
          <h3>
            Press <Link to="/">here</Link> to go back to the homepage
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
