import React, {Fragment} from 'react'
import './contentCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function ContentCard(props){
    const {title, text} = props

    return(
        <div className="contentCard ">
            
            <div className="contentCardImage ">
                <img className='width100'src="https://picsum.photos/200" alt=""/>
            </div>
            <div className=" ">
                <div className="contentCardTitleContainer text-center ">
                    <h3 className='contentCardTitle'>{title}</h3>
                </div>
                
                {text &&
                <Fragment>
                <p className='text-left recipeText'>
                    
                    
                        <div className="iconSpacer" >
                            <div className='bold'>Rating:</div>  
                            <div className="yellow iconSpacer2 ">  
                                <div>
                                    <FontAwesomeIcon icon={faStar}/>  
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faStar}/>  
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faStar}/>  
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faStar}/>  
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faStar}/>  
                                </div>
                                  
                            </div>
                        </div>
                    

                </p>
                <p className='text-left recipeText'><span className='bold'>By:</span> Pleather Shaman</p>
                </Fragment>
                
                }
                </div>
                {/* <p className='text-left recipeText'><FontAwesomeIcon icon={faCoffee}/><span className='bold'>Yields:</span> 4</p>
                <p className='text-left recipeText'><FontAwesomeIcon icon={faCoffee}/><span className='bold'>Cooking Time:</span> 60 mintues</p> */}
                
            
            <div className="contentCardText"></div>
        </div>
    )
}


export default ContentCard
