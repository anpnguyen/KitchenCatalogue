import React, {Fragment} from 'react'
import ContentCard from './contentCard'
import './contentBox.css'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function ContentBox(props){

    const {title, text, recipe, showAll} = props
    
    const {recipes} = recipe


    
    const mappedData = recipes.map((recipe, index) =>{
        
        
        if(!showAll && index <4)
            {
            return <ContentCard title="Chicken Curry" recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
            
        } 

        else if(showAll){
            return <ContentCard title="Chicken Curry" recipe={recipe} showAll={showAll} text={text} key={recipe._id}/>
        } else {
            return <Fragment key={recipe._id}></ Fragment>
        }

        
    })

    return(
        <div className="contentBox">
            
            <div className="contentBoxContent ">
                <h1 className="text-center">{title}</h1>  
                <hr className="width80"/>
                <div className="contentBoxCard">
                    {mappedData}
           
                </div>
                
            </div>
            
        </div>


                
            
            
            
    )
}

// export default ContentBox
ContentBox.propTypes = {
    recipe: PropTypes.object.isRequired
    // auth: PropTypes.object.isRequired,
    // getRecipes: PropTypes.func.isRequired


}


const mapStateToProps = state => ({
    // auth: state.auth,
    recipe: state.recipe
})

export default connect(mapStateToProps, {})(ContentBox)



