import React from "react";
import HomePage from "./homePage";
import Content from "./content";
import SearchBar from "./searchBar";
import { connect } from "react-redux";

function MySearchRecipes(props) {
  const { search, match , nav} = props;

  return (
    <Content {...props}>
      <SearchBar />
      {search.loading ? (
        <h1>This is loading</h1>
      ) : (
        <HomePage arr={search.searchRecipes} option="search" title='Search Results' searchParams={search.searchData} match={match} nav={nav}>
          {/* <h1>Search Results</h1> */}
        </HomePage>
      )}
    </Content>
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
