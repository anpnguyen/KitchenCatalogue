import React from "react";
import HomePage from "./homePage/homePage";
import ContentContainer from "./contentContainer/contentContainer";
import SearchBar from "./searchBar/searchBar";
import { connect } from "react-redux";
import Spinner from '../Layout/spinner'

function MySearchRecipes(props) {
  const { search, match , nav} = props;

  return (
    <ContentContainer {...props}>
      <SearchBar />
      {search.loading ? (
         <Spinner/>
      ) : (
        <HomePage arr={search.searchRecipes} option="search" title='Search Results' searchParams={search.searchData} match={match} nav={nav}>
          
        </HomePage>
      )}
    </ContentContainer>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search
});

export default connect(
  mapStateToProps,
  {}
)(MySearchRecipes);
