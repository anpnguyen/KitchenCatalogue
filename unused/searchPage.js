import React, { Fragment, useEffect } from "react";
import NavBar from "./navBar";
import SearchBar from "./searchBar";
import ContentBox from "./contentBox";
import Footer from "./footer";
import Alert from "./alert";
import { getRecipes } from "../../actions/recipe";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from 'uuid/v4'

const SearchPage = props => {
  const { getRecipes, search } = props;

  useEffect(() => {
    getRecipes(search.searchData);
  }, [getRecipes, search]);

  return (
    <Fragment>
      <NavBar />
      <SearchBar {...props} />
      <Alert />

      <ContentBox
        title="My Recipes"
        text={true}
        showAll={true}
        {...props}
        isSearch={true}
        key={uuid() + 'search'}
      />

      <Footer />
    </Fragment>
  );
};

// export default Home

SearchPage.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired
};

// this is the state that the current component has available to it
const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
  search: state.search
  // profile: state.profile
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(SearchPage);
