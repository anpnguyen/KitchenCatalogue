import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./navBar";
import SearchBar from "./searchBar";
import ContentBox from "./contentBox";
import Footer from "./footer";
import Alert from "./alert";
import CookbookContentBox from '../cookbook/cookBookContent'
import { getRecipes } from "../../actions/recipe";
import { getCookbooks, getCookbookById } from "../../actions/cookbook";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import uuid from 'uuid/v4'


const Home = props => {
  const { getRecipes, getCookbooks, search, option, recipe, cookbook, match, individualCookbook, getCookbookById} = props;

  useEffect(() => {
    getRecipes();
    getCookbooks();
  }, [getRecipes, getCookbooks]);


  useEffect(()=>{
    
    individualCookbook.loading && getCookbookById(match.params.cookbook_id)

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
      
      {option === 'cookbook'&&
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

      {option === 'recipe'&& 
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
  // profile: state.profile
});

export default connect(
  mapStateToProps,
  { getRecipes, getCookbooks, getCookbookById }
)(Home);
