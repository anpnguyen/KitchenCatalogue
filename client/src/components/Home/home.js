import React , {Fragment}from 'react'
import NavBar from './navBar'
import SearchBar from './searchBar'
import ContentBox from './contentBox'
import Footer from './footer'
import IndividualRecipe from './Recipes/individualRecipe'

function Home(){
    return(
        <Fragment>
            <NavBar/>
            <SearchBar/>
            <IndividualRecipe/>
            {/* <ContentBox title="My recipes" text={true}/> */}
            {/* <ContentBox title="My Cookbooks" text={false}/> */}

            {/* <ContentBox title="My Recipes" text={true} myRecipes={true}/> */}

            <Footer/>
        </Fragment>


    )
}

export default Home