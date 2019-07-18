import React from "react";
import HomePage from "./homePage";
import Content from "./content";
import SearchBar from "./searchBar";
import { connect } from "react-redux";
import { getCookbooks } from "../../actions/cookbook";

function MyCookbooks(props) {
  const { cookbook } = props;

  return (
    <Content {...props}>
      <SearchBar />
      {cookbook.loading ? (
        <h1>This is loading</h1>
      ) : (
        <HomePage arr={cookbook.cookbooks} option="cookbook" title='My Cookbooks'>
          {/* <h1>My Cookbooks</h1> */}
        </HomePage>
      )}
    </Content>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  cookbook: state.cookbook
});

export default connect(
  mapStateToProps,
  {
    getCookbooks
  }
)(MyCookbooks);
