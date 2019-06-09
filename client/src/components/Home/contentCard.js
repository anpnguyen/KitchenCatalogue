import React, {Fragment} from 'react'
import './contentCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function ContentCard(props){
    const {title, text} = props

    return(
        <div className="contentCard ">
            <div >
                <img className='width100'src="https://picsum.photos/200" alt=""/>
            </div>
            <div className=" ">
                <div className="contentCardTitleContainer ">
                    <h3>{title}</h3>
                </div>
                
                {text &&
                <Fragment>
                <p className=' recipeText'>
                    
                    
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
                    

                </p>
                <p className=' recipeText'><span className='bold'>By:</span> Pleather Shaman</p>
                </Fragment>
                
                }
                </div>
              
                
            
            {/* <div className="contentCardText"></div> */}
        </div>
    )
}


export default ContentCard
