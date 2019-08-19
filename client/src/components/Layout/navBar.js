import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { clearRecipe } from "../../actions/recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./navBar.css";

const NavBar = props => {
  const { match } = props;
  const node = useRef();
  const { logout, clearRecipe } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuActive, setShowMenuActive] = useState(false);

  const handleToggle = () => {
    if (!showMenu) {
      setShowMenu(!showMenu);

      setTimeout(() => {
        setShowMenuActive(!showMenuActive);
      }, 0);
    } else {
      setShowMenu(!showMenu);
      setShowMenuActive(!showMenuActive);
    }
  };

  const handleLogout = () => {
    clearRecipe();
    logout();
  };

  const memoSetMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", memoSetMenu, true);

    return () => {
      window.removeEventListener("scroll", memoSetMenu, true);
    };
  }, [memoSetMenu]);

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
      <div className="navBarContainer">
        <div className="navBarLogo">
          <h3 className="navBarLogoText">
            <Link to="/">Kitchen Catalogue</Link>
          </h3>
        </div>
        <div className="navBarListContainer" ref={node}>
          <div className="navButton" onClick={handleToggle}>
            {!showMenu ? (
              <FontAwesomeIcon icon={faBars} height="2em" />
            ) : (
              <FontAwesomeIcon icon={faTimes} height="2em" />
            )}
          </div>
          <div className="navBarList">
            <ul
              className={`NavList ${showMenu ? "active" : ""} ${
                showMenuActive ? "transition" : ""
              } `}
            >
              {/* <hr className="navBarDivider" /> */}
              <li
                className={`${match.url.startsWith("/recipe") &&
                  match.url !== "/recipe/new" &&
                  "active"} `}
              >
                <Link to="/recipe" onClick={() => setShowMenu(false)}>
                  Recipes
                </Link>
              </li>
              <li
                className={`${match.url.startsWith("/cookbook") && "active"} `}
              >
                <Link to="/cookbook" onClick={() => setShowMenu(false)}>
                  Cookbooks
                </Link>
              </li>
              <li className={`${match.url === "/recipe/new" && "active"} `}>
                <Link to="/recipe/new" onClick={() => setShowMenu(false)}>
                  Create Recipe
                </Link>
              </li>
              {/* <hr className="navBarDivider" /> */}
              <li className="navBarListItem" onClick={handleLogout}>
                <Link to="/login" onClick={() => setShowMenu(false)}>
                  LOGOUT
                </Link>
              </li>
            </ul>
          </div>
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

export default withRouter(
  connect(
    mapStateToProps,
    { logout, clearRecipe }
  )(NavBar)
);
