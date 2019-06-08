import React , {Fragment}from 'react'
import NavBar from './navBar'
import SearchBar from './searchBar'
import ContentBox from './contentBox'

function Home(){
    return(
        <Fragment>
            <NavBar/>
            <SearchBar/>
            <ContentBox title="My recipes" text={true}/>
            <ContentBox title="My Cookbooks" text={false}/>
        </Fragment>


    )
}

export default Home