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



function MyCookbookRecipes(props) {

 const {individualCookbook, match} = props

 useEffect(()=>{
  getRecipes()
 }, [])

 console.log(individualCookbook.individualCookbook.savedRecipes)


    return (
      <Content {...props}>
        <SearchBar />
      {individualCookbook.loading? <h1>This is loading</h1> : 
        <HomePage 
          arr= {individualCookbook.individualCookbook.savedRecipes}
          option='cookbookRecipe'
        >
            <h1>Mycookbook Recipes</h1>
            {/* <Link to='/b'>Cookbooks</Link> */}
        </HomePage>}
        </Content>
    )
}


const mapStateToProps = state => ({
  auth: state.auth,
  individualCookbook: state.individualCookbook,
 });


export default connect(
    mapStateToProps,
    {
      getRecipes,
      updateFromLS,
     
    }
  )(MyCookbookRecipes);