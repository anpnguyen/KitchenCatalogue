import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { clearRecipe } from "../../actions/recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./navBar.css";

const NavBar = props => {
  const node = useRef();
  const { logout, clearRecipe } = props;
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    clearRecipe();
    logout();
  };

  const memoSetMenu = useCallback(() => {
    setShowMenu(false);
  },[]);

  useEffect(() => {
    window.addEventListener("scroll", memoSetMenu, true);

    return () => {
      window.removeEventListener("scroll", memoSetMenu, true);
    };
  },[memoSetMenu]);

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        node.current.contains(e.target || <div className="navBarButton " />)
      ) {
        return;
      }

      setShowMenu(false);
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav className="navBar">
      <div className="navBarLogo">
        <p className="navBarLogoText">
          <Link to="/">Kitchen Catalogue</Link>
        </p>
      </div>
      <div className="navBarContainer" ref={node}>
        <div className="navButton" onClick={handleToggle}>
          {!showMenu ? (
            <FontAwesomeIcon icon={faBars} height="2em" />
          ) : (
            <FontAwesomeIcon icon={faTimes} height="2em" />
          )}
        </div>
        <div className="navBarListContainer">
          <ul className={`NavList ${!showMenu ? "slide" : ""}`}>
            {/* <li className="">
              <h2 className="pacifico">Kitchen Catalogue</h2>
            </li>
            <hr className="navBarDivider" /> */}
            <hr className="navBarDivider" />
            <li className="">
              <Link to="/recipe/new" onClick={() => setShowMenu(false)}>
                Create A Recipe
              </Link>
            </li>
            <li className="">
              <Link to="/recipe" onClick={() => setShowMenu(false)}>
                View All Recipes
              </Link>
            </li>
            <hr className="navBarDivider" />
            <li className="navBarListItem" onClick={handleLogout}>
              <Link to="/login" onClick={() => setShowMenu(false)}>
                LOGOUT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  clearRecipe: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, clearRecipe }
)(NavBar);
