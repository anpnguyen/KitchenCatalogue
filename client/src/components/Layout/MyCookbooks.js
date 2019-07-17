import React, { Fragment, useEffect, useState } from "react";
import HomePage from './homePage'
import Content from './content'
import SearchBar from './searchBar'
import { connect } from "react-redux";
import { getCookbooks, updateCookbookFromLS } from "../../actions/cookbook";
// import {
//     getRecipes,
//     clearRecipe,
//     updateFromLS
//   } from "../../actions/recipe";



// make the request and send data through



function MyCookbooks(props) {
    const {getCookbooks, cookbook} = props
    // useEffect(()=>{
    //     getCookbooks()
    // },[])

 



 console.log(cookbook.cookbook)


    return (
      <Content {...props}>
        <SearchBar />
      {cookbook.loading? <h1>This is loading</h1> : 
        <HomePage 
          arr= {cookbook.cookbooks}
          option='cookbook'
        >
            
        </HomePage>}
        </Content>
    )
}


const mapStateToProps = state => ({
  auth: state.auth,
  cookbook: state.cookbook,
 });


export default connect(
    mapStateToProps,
    {
      getCookbooks,
     
    }
  )(MyCookbooks);