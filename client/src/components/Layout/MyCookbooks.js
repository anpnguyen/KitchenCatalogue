import React from "react";
import HomePage from "./homePage";
import Content from "./content";
import SearchBar from "./searchBar";
import { connect } from "react-redux";
import { getCookbooks } from "../../actions/cookbook";
import Spinner from '../Layout/spinner'

function MyCookbooks(props) {
  const { cookbook, match, nav } = props;

  return (
    <Content {...props}>
      <SearchBar />
      {cookbook.loading ? (
         <Spinner/>
      ) : (
        <HomePage arr={cookbook.cookbooks} option="cookbook" title='My Cookbooks' match={match} nav={nav}> 
          
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
