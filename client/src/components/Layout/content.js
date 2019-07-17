import React, { Fragment , useEffect} from "react";
import NavBar from "./navBar";
import Footer from "./footer";
import Alert from "./alert";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {
  getRecipes,
  clearRecipe,
  updateFromLS
} from "../../actions/recipe";
import { getCookbooks, updateCookbookFromLS } from "../../actions/cookbook";
import {  getCookbookById} from "../../actions/individualCookbook";
import { getSearchRecipes , updateFromSearchLS} from "../../actions/search";


function Content(props) {

  const {match, recipe, cookbook, individualCookbook, search,getRecipes,getCookbooks,updateFromLS,updateCookbookFromLS, getCookbookById , updateFromSearchLS} = props

  useEffect(() => {
    !localStorage.recipeState && getRecipes();
    !localStorage.cookbookState && getCookbooks();
       
    if(localStorage.recipeState && recipe.loading){
      let oldState = JSON.parse(localStorage.getItem('recipeState'))
      updateFromLS(oldState)
      
    } 

    if(localStorage.cookbookState && cookbook.loading){
      let oldState = JSON.parse(localStorage.getItem('cookbookState'))
      updateCookbookFromLS(oldState)
      
    } 
    
       
  }, []);

  useEffect(() => {
    
    !localStorage.searchState && getSearchRecipes(search.searchData)
    
    if(localStorage.searchState && search.loading){
      let oldState = JSON.parse(localStorage.getItem('searchState'))
      updateFromSearchLS(oldState)
      
    } 
  }, []);



  if(individualCookbook.loading &&
    match.params.cookbook_id !== undefined ){
    console.log('individual recipe calling')
    getCookbookById(match.params.cookbook_id)
  }
  

  






  return (
    <Fragment>
      <NavBar />
      <Alert />
      

      
      {props.children}


      <Footer />
    </Fragment>
  );
}
Content.propTypes = {
  auth: PropTypes.object.isRequired,
  getRecipes: PropTypes.func.isRequired,
  getCookbooks: PropTypes.func.isRequired
};

// this is the state that the current component has available to it
const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
  search: state.search,
  cookbook: state.cookbook,
  individualCookbook: state.individualCookbook
});

export default connect(
  mapStateToProps,
  {
    getRecipes,
    getCookbooks,
    getCookbookById,
    getSearchRecipes,
    clearRecipe,
    updateFromLS,
    updateCookbookFromLS,
    updateFromSearchLS
  }
)(Content);
