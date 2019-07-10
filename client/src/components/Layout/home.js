import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./navBar";
import SearchBar from "./searchBar";
import ContentBox from "./contentBox";
import Footer from "./footer";
import Alert from "./alert";
import { getRecipes } from "../../actions/recipe";
import { getCookbooks } from "../../actions/cookbook";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Home = props => {
  const { getRecipes, getCookbooks } = props;

  useEffect(() => {
    getRecipes();
    getCookbooks();
  }, [getRecipes, getCookbooks]);

  const [isSearch, setIsSearch] = useState({
    searchStatus: false,
    searchText: ""
  });

  return (
    <Fragment>
      <NavBar />
      <SearchBar setIsSearch={setIsSearch} {...props} />
      <Alert />

      <ContentBox
        title="My Recipes"
        text={true}
        showAll={true}
        {...props}
        isSearch={isSearch}
      />

      <Footer />
    </Fragment>
  );
};



Home.propTypes = {
    auth: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired,
  getCookbooks: PropTypes.func.isRequired
};

// this is the state that the current component has available to it
const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
  // profile: state.profile
});

export default connect(
  mapStateToProps,
  { getRecipes, getCookbooks }
)(Home);
