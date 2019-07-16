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

// make the request and send data through



function MyRecipes(props) {

 const {getRecipes, recipe} = props

 useEffect(()=>{
  getRecipes()
 }, [])

 console.log(recipe.recipes)


    return (
      <Content>
        <SearchBar />
      {recipe.loading? <h1>This is loading</h1> : 
        <HomePage 
          arr= {recipe.recipes}
        >
            
            {/* contentCards */}
            {/* access to navigation */}
            {/* access to data  */}

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