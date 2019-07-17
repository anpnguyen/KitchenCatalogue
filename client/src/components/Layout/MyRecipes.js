import React, { Fragment, useEffect, useState } from "react";
import HomePage from './homePage'
import Content from './content'
import SearchBar from './searchBar'
import { connect } from "react-redux";
import {
    getRecipes,
    clearRecipe,
    updateFromLS
  } from "../../actions/recipe";

  import {Link} from 'react-router-dom'

// make the request and send data through



function MyRecipes(props) {

 const {getRecipes, recipe} = props

//  useEffect(()=>{
//   getRecipes()
//  }, [])

 


    return (
      <Content {...props}>
        <SearchBar />
      {recipe.loading? <h1>This is loading</h1> : 
        <HomePage 
          arr= {recipe.recipes}
          option='recipe'
        >
            <h1>My Recipes</h1>
            <Link to='/b'>Cookbooks</Link>
        </HomePage>}
        </Content>
    )
}


const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
 });


export default connect(
    mapStateToProps,
    {
      getRecipes,
      updateFromLS,
     
    }
  )(MyRecipes);