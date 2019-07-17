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

 


    return (
      <Content {...props}>
        <SearchBar />
      {individualCookbook.loading? <h1>This is loading</h1> : 
        <HomePage 
          arr= {individualCookbook.individualCookbook.savedRecipes}
          option='cookbookRecipe'
        >
            <h1>{individualCookbook.individualCookbook.cookbookTitle}</h1>
            
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