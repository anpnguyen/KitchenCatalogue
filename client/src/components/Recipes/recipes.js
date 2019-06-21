import React, { useEffect } from "react";
import NavBar from "../navBar";
import ContentBox from "../contentBox";
import { getRecipes } from "../../../actions/recipe";
import { connect } from "react-redux";

import PropTypes from "prop-types";

const Recipes = props => {
  const { getRecipes } = props;

  useEffect(() => {
    console.log("calling");
    getRecipes();
  }, [getRecipes]);

  return (
    <>
      <NavBar />

      <ContentBox title="My Recipes" text={true} showAll={true} />
    </>
  );
};

// export default Recipes

Recipes.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired
};

// this is the state that the current component has available to it
const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(Recipes);
