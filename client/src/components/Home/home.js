import React , {Fragment}from 'react'
import NavBar from './navBar'
import SearchBar from './searchBar'
import ContentBox from './contentBox'
import Footer from './footer'

function Home(){
    return(
        <Fragment>
            <NavBar/>
            <SearchBar/>
            <ContentBox title="My recipes" text={true}/>
            <ContentBox title="My Cookbooks" text={false}/>

            {/* <ContentBox title="My Recipes" text={true} myRecipes={true}/> */}

            <Footer/>
        </Fragment>


    )
}

export default Home