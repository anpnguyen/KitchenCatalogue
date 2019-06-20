import React, {useEffect} from 'react'
import NavBar from '../navBar'
import ContentBox from '../contentBox'
import {getSetRecipes} from '../../../actions/recipe'
import {connect} from 'react-redux'

import PropTypes from 'prop-types'


function RecipesSet(props){
    
    const {getSetRecipes, match, auth} = props

    useEffect(()=>{
        
        getSetRecipes(match.params.setNumber)},[getSetRecipes]

    )




    return(
            <>
            <NavBar/>
       
            <ContentBox title="RecipesSet" text={true} showAll={true} />
        </>
    )
}

// export default Recipes

RecipesSet.propTypes = {
    // getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    getSetRecipes: PropTypes.func.isRequired,


}

// this is the state that the current component has available to it
const mapStateToProps = state => ({
    auth: state.auth,
    recipe: state.recipe
    
})

export default connect(mapStateToProps, {getSetRecipes})(RecipesSet)