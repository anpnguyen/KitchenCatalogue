import React, {Fragment} from 'react'
import './contentCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { withRouter} from 'react-router-dom'
import {clearRecipe} from '../../actions/recipe'
import {connect} from 'react-redux'


function ContentCard(props){
    const { text, clearRecipe} = props
    const {title, imageUrl, _id} = props.recipe

    // const handleClear = () => (

    //     clearRecipe()
    // )

    const handleClicker = () => {
        clearRecipe()
        props.history.push(`/recipe/${_id}`)
    }
        
        
    

    return(
        
        <div className="contentCard " onClick={handleClicker}>

            <div >
                <img className='width100'src={imageUrl} alt=""/>
            </div>
            <div className=" ">
                <div className="contentCardTitleContainer ">
                    <h3>{title}</h3>
                </div>
                
                {text &&
                <Fragment>
                <div className=' recipeText'>
                    
                    
                        <div className="iconSpacer" >
                            <div className='bold'>Rating:</div>  
                            <div className="yellow  ">  
                                {/* <div> */}
                                    <FontAwesomeIcon icon={faStar}/>  
                                {/* </div> */}
                                {/* <div> */}
                                    <FontAwesomeIcon icon={faStar}/>  
                                {/* </div> */}
                                {/* <div> */}
                                    <FontAwesomeIcon icon={faStar}/>  
                                {/* </div> */}
                                {/* <div> */}
                                    <FontAwesomeIcon icon={faStar}/>  
                                {/* </div> */}
                                {/* <div> */}
                                    <FontAwesomeIcon icon={faStar}/>  
                                {/* </div> */}
                                  
                            </div>
                        </div>
                    

                </div>
                <p className=' recipeText'><span className='bold'>By:</span> Pleather Shaman</p>
                </Fragment>
                
                }
                </div>
              
                
            
            {/* <div className="contentCardText"></div> */}
        </div>
    
    )
}

export default withRouter(connect(null, {clearRecipe})(ContentCard))


