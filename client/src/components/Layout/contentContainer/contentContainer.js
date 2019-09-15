import React, { Fragment, useEffect } from "react";
import NavBar from "./navBar/navBar";
import Footer from "./footer/footer";
import Alert from "./alert/alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRecipes, clearRecipe, updateFromLS } from "../../../actions/recipe";
import { getCookbooks, updateCookbookFromLS } from "../../../actions/cookbook";
import { getCookbookById } from "../../../actions/individualCookbook";
import { getSearchRecipes, updateFromSearchLS } from "../../../actions/search";

function ContentContainer(props) {
  const {
    match,
    recipe,
    cookbook,
    individualCookbook,
    search,
    getRecipes,
    getCookbooks,
    updateFromLS,
    updateCookbookFromLS,
    getCookbookById,
    updateFromSearchLS
  } = props;

  // checks if there is localStorage State, if so it will load it to the redux store. If noting, it will make a get request
  useEffect(() => {
    !localStorage.recipeState && getRecipes();
    !localStorage.cookbookState && getCookbooks();  

    if (localStorage.recipeState && recipe.loading) {
      let oldState = JSON.parse(localStorage.getItem("recipeState"));
      updateFromLS(oldState);      
    }

    if (localStorage.cookbookState && cookbook.loading) {
      let oldState = JSON.parse(localStorage.getItem("cookbookState"));
      updateCookbookFromLS(oldState);
    }
  }, []);

  useEffect(() => {
    !localStorage.searchState && getSearchRecipes(search.searchData);

    if (localStorage.searchState && search.loading) {
      let oldState = JSON.parse(localStorage.getItem("searchState"));
      updateFromSearchLS(oldState);
    }
  }, [updateFromSearchLS, search.loading, search.searchData  ]);

  if (individualCookbook.loading && match.params.cookbook_id !== undefined) {
      getCookbookById(match.params.cookbook_id);
  }

  return (
    <Fragment>
      <NavBar />
      <Alert />

      {props.children}

      <Footer />
    </Fragment>
  );
}
ContentContainer.propTypes = {
  auth: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired,
  getCookbooks: PropTypes.func.isRequired,
  getCookbookById:PropTypes.func.isRequired,
  clearRecipe: PropTypes.func.isRequired,
  updateFromLS: PropTypes.func.isRequired,
  updateCookbookFromLS: PropTypes.func.isRequired,
  updateFromSearchLS: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
  search: state.search,
  cookbook: state.cookbook,
  individualCookbook: state.individualCookbook
});

export default connect(
  mapStateToProps,
  {
    getRecipes,
    getCookbooks,
    getCookbookById,
    getSearchRecipes,
    clearRecipe,
    updateFromLS,
    updateCookbookFromLS,
    updateFromSearchLS
  }
)(ContentContainer);
