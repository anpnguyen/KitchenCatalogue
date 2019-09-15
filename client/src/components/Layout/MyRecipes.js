import React from "react";
import HomePage from "./homePage";
import ContentContainer from "./contentContainer/contentContainer";
import SearchBar from "./searchBar/searchBar";
import { connect } from "react-redux";
import Spinner from '../Layout/spinner'


function MyRecipes(props) {
  const { recipe, match , nav} = props;

 
  return (
    <ContentContainer {...props}>
      <SearchBar />
      {recipe.loading ? (
         <Spinner/>
      ) : (
        <HomePage arr={recipe.recipes} option="recipe" title='My Recipes' match={match} nav={nav}>
                   
        </HomePage>
      )}
    </ContentContainer>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  {}
)(MyRecipes);
