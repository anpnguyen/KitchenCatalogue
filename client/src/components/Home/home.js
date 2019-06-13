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
            

            <ContentBox title="My Recipes" text={true} showAll={true} {...props}/>
            
            
            

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
