import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./navBar";
import SearchBar from "./searchBar";
import ContentBox from "./contentBox";
import Footer from "./footer";
import Alert from "./alert";
import CookbookContentBox from '../cookbook/cookBookContent'
import { getRecipes, updateRecipesFromLocalStorage } from "../../actions/recipe";
import { getCookbooks, getCookbookById } from "../../actions/cookbook";
import { getSearchRecipes } from "../../actions/search";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from 'uuid/v4'


const Home = props => {
  const { getRecipes, getCookbooks, search, option, recipe, cookbook, match, individualCookbook, getCookbookById, getSearchRecipes, updateRecipesFromLocalStorage} = props;

  // useEffect(() => {
  //   !localStorage.recipe && recipe.loading && getRecipes();

  //   console.log(JSON.parse(localStorage.recipe))
  //   localStorage.recipe && recipe.loading && updateRecipesFromLocalStorage(JSON.parse(localStorage.recipe))
    
 
  // }, []);

// when you create a new recipe -> add to data base, get back the item, push to sate, update local storage then shot the new recipe

  useEffect(() => {
    
    
    getRecipes()
    getCookbooks();
  }, []);

  


  useEffect(() => {
    option === 'search' &&
    getSearchRecipes(search.searchData);
    
  }, []);

  // useEffect(() => {
  //   window.addEventListener('beforeunload', (e)=>{
  //     e.preventDefault()
  //     localStorage.setItem('working', JSON.stringify(cookbook))})
  // }, []);
//   const exitConfirmation = ()=>{
//     localStorage.setItem('cookbook', JSON.stringify(cookbook))
//     localStorage.setItem('recipe', JSON.stringify(recipe))
//     localStorage.setItem('individualCookbook', JSON.stringify(individualCookbook))
//     localStorage.setItem('search', JSON.stringify(search))
//     console.log('calling localstorage save')
//  }
//   window.onbeforeunload = exitConfirmation()

  



// loads up the individual cookbook
  useEffect(()=>{
    
    individualCookbook.loading && match.params.cookbook_id && getCookbookById(match.params.cookbook_id)

  },[])

 

  const [isSearch, setIsSearch] = useState({
    searchStatus: false,
    searchText: ""
  });

  
  return (
    <Fragment>
      <NavBar />
      <SearchBar setIsSearch={setIsSearch} {...props} />
      <Alert />
      
      {option === 'cookbook' && !cookbook.loading  && cookbook != null &&
      <CookbookContentBox
        title="My Cookbooks"
        cookbook={cookbook}
        search={search}
        text={true}
        showAll={true}
        {...props}
        isSearch={isSearch}
        key={uuid() + ' home'}
      />
      }

      {option === 'recipe'&& !recipe.loading &&
      <ContentBox
      title="My Recipes"
      recipes={recipe.recipes}
        isLoading = {recipe.loading}
        search={search}
        text={true}
        showAll={true}
        {...props}
        isSearch={isSearch}
        key={uuid() + ' home'}
      />
      }

{option === 'cookbookRecipes'&& !individualCookbook.loading &&
      <ContentBox
      
        title={individualCookbook.individualCookbook.cookbookTitle}
        recipes={individualCookbook.individualCookbook.savedRecipes}
        isLoading = {recipe.loading}
        search={search}
        text={true}
        showAll={true}
        {...props}
        isSearch={isSearch}
        key={uuid() + ' home'}
        option={option}
      />
      }

{option === 'search'&& !search.loading &&
<ContentBox

  title='search'
  recipes={search.searchRecipes}
  isLoading = {search.loading}
  searchData = {search.searchData}
  // search={search}
  text={true}
  showAll={true}
  {...props}
  isSearch={true}
  key={uuid() + ' home'}
/>
}
      

      

      <Footer />
    </Fragment>
  );
};



Home.propTypes = {
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
  { getRecipes, getCookbooks, getCookbookById, getSearchRecipes , updateRecipesFromLocalStorage}
)(Home);
