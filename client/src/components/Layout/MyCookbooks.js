import React from "react";
import HomePage from "./homePage";
import ContentContainer from "./contentContainer/contentContainer";
import SearchBar from "./searchBar/searchBar";
import { connect } from "react-redux";
import { getCookbooks } from "../../actions/cookbook";
import Spinner from '../Layout/spinner'

function MyCookbooks(props) {
  const { cookbook, match, nav } = props;

  return (
    <ContentContainer {...props}>
      <SearchBar />
      {cookbook.loading ? (
         <Spinner/>
      ) : (
        <HomePage arr={cookbook.cookbooks} option="cookbook" title='My Cookbooks' match={match} nav={nav}> 
          
        </HomePage>
      )}
    </ContentContainer>
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
