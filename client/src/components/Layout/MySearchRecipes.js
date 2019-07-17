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


function MySearchRecipes(props) {

 const {getRecipes, search} = props

 useEffect(()=>{
  getRecipes()
 }, [])

 console.log(search.searchRecipes)


    return (
      <Content {...props}>
        <SearchBar />
      {search.loading? <h1>This is loading</h1> : 
        <HomePage 
          arr= {search.searchRecipes}
          option='search'
        >
            <h1>this is myRecipes</h1>
            <Link to='/b'>Cookbooks</Link>
        </HomePage>}
        </Content>
    )
}


const mapStateToProps = state => ({
  auth: state.auth,
  search: state.search,
 });


export default connect(
    mapStateToProps,
    {
      getRecipes,
      updateFromLS,
     
    }
  )(MySearchRecipes);