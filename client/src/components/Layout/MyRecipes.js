import React from "react";
import HomePage from "./homePage";
import Content from "./content";
import SearchBar from "./searchBar";
import { connect } from "react-redux";
import Spinner from '../Layout/spinner'

// make the request and send data through

function MyRecipes(props) {
  const { recipe, match , nav} = props;

 
  return (
    <Content {...props}>
      <SearchBar />
      {recipe.loading ? (
         <Spinner/>
      ) : (
        <HomePage arr={recipe.recipes} option="recipe" title='My Recipes' match={match} nav={nav}>
          {/* <h1>My Recipes</h1> */}
          
        </HomePage>
      )}
    </Content>
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
