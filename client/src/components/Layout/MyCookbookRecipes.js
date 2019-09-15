import React from "react";
import HomePage from "./homePage/homePage";
import ContentContainer from "./contentContainer/contentContainer";
import SearchBar from "./searchBar/searchBar";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";

// make the request and send data through

function MyCookbookRecipes(props) {
  const { individualCookbook, match, nav } = props;

  return (
    <ContentContainer {...props}>
      <SearchBar />
      {individualCookbook.loading ? (
        <Spinner />
      ) : (
        <HomePage
          arr={individualCookbook.individualCookbook.savedRecipes}
          option="cookbookRecipe"
          title={individualCookbook.individualCookbook.cookbookTitle}
          match={match}
          nav={nav}
        />
      )}
    </ContentContainer>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  individualCookbook: state.individualCookbook
});

export default connect(
  mapStateToProps,
  {}
)(MyCookbookRecipes);
