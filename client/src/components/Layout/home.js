import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./navBar";
import SearchBar from "./searchBar";
import ContentBox from "./contentBox";
import Footer from "./footer";
import Alert from "./alert";
import { getRecipes } from "../../actions/recipe";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Home = props => {
  const { getRecipes } = props;

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);
  const [isSearch, setIsSearch] = useState({
    searchStatus: false,
    searchText: ""
  });

  
  

  return (
    <Fragment >
      <NavBar />
      <SearchBar setIsSearch={setIsSearch} {...props} />
      <Alert />
      {/* {isSearch.searchStatus? <h1>{isSearch.searchText}</h1>: <h1>not searching</h1>       } */}

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

// export default Home

Home.propTypes = {
  // getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired
};

// this is the state that the current component has available to it
const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
  // profile: state.profile
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(Home);
