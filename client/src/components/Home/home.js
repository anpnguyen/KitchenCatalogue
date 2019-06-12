import React , {Fragment, useEffect}from 'react'
import NavBar from './navBar'
import SearchBar from './searchBar'
import ContentBox from './contentBox'
import Footer from './footer'
// import IndividualRecipe from './Recipes/individualRecipe'

import {getRecipes} from '../../actions/recipe'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'


function Home(props){

    const {getRecipes} = props

    useEffect(()=>{
        // console.log('calling')
        getRecipes()},[getRecipes]

    )

    return(
        <Fragment>
            <NavBar/>
            <SearchBar/>
            {/* <IndividualRecipe {...props}/> */}

            <ContentBox title="My Favourite Recipes" text={true} showAll={false} {...props}/>
            
            {/* <ContentBox title="My Cookbooks" text={false} showAll={false} {...props}/> */}

            {/* <ContentBox title="My Recipes" text={true} myRecipes={true}/> */}

            <Footer/>
        </Fragment>


    )
}

// export default Home

Home.propTypes = {
    // getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getRecipes: PropTypes.func.isRequired


}

// this is the state that the current component has available to it
const mapStateToProps = state => ({
    auth: state.auth,
    recipe: state.recipe
    // profile: state.profile
})

export default connect(mapStateToProps, {getRecipes})(Home)
