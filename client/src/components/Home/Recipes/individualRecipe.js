import React from 'react'
import './individualRecipe.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStar } from '@fortawesome/free-solid-svg-icons'
// import {Image1} from '../../../images/1.jpg'

function IndividualRecipe(){
    return(
        <div className="contentBox">
            <div className="contentBoxSide "></div>
            <div className="contentBoxContent ">
                
                <div className="individualRecipe ">
                <h1 className="text-center">Chicken Pasta</h1>  
                <div className="individualRecipeDetails text-center">
                    <div className='spanMargin'>
                        <p><span className='bold'>By: </span> PleatherShaman  </p>
                        <p><span className="spanMargin"><span className='bold'>Serves </span> 4</span>  <span className='bold'>Cooking Time:</span> 20 minutes</p>      
                    </div>
                    <div className='individualRecipeSave text-center'>
                        <button>Save</button>
                    </div> 
                  

                </div> 
               
                <hr className="width80"/>
                <div className="text-center ">
                    <img className='image' src='https://picsum.photos/300' alt=""/>
                </div>

                <div className="individualRecipeText">
                    <div className="ingredients  ">
                        <ul className="individualRecipeUl border">
                            <li className='bold individualRecipeList color'>Ingredients</li>
                            <li className='individualRecipeList'>1 cup of Sugar</li>
                            <li className='individualRecipeList'>1 cup of Meat</li>
                            <li className='individualRecipeList'>100 grams of  flour or brown flour</li>
                            <li className='individualRecipeList'>1 cup of water</li>
                            <li className='individualRecipeList'>2 slice of bread</li>
                            
                           
                        </ul>
                    </div>
                    <div className="instructions "> 
                    
                    <div className="list">
                        
                    </div>

                    <ul className="individualRecipeInstructions">
                            
                            <li className='individualRecipeList bold color'>Instructions</li>

                            <li className='individualRecipeListInstructions'>
                                <div className="number">
                                    <span className='bold'>1. </span>  
                                </div>
                                <div >
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint imos itaque ad asperiores? Enim, molestias.
                                </div>
                            </li>
                            <hr className='width80'/>

                            <li className='individualRecipeListInstructions'>
                                <div className="number">
                                    <span className='bold'>2. </span>  
                                </div>
                                <div>
                                    Lorem ipsum, dolor sit amet consec ad asperiores? Enim, molestias.
                                </div>
                            </li>
                            <hr className='width80'/>

                            <li className='individualRecipeListInstructions'>
                                <div className="number">
                                    <span className='bold'>3. </span>  
                                </div>
                                <div>
                                    Lorem it. Sint assumenda rerum blanditiis quod, sequi dignissimos itaque ad asperiores? Enim, molestias.
                                </div>
                            </li>
                            <hr className='width80'/>

                            <li className='individualRecipeListInstructions'>
                                <div className="number">
                                    <span className='bold'>4. </span>  
                                </div>
                                <div>
                                   Sint assumenda rerum blanditiis quod, sequi dignissimos itaque ad asperiores? Enim, molestias.
                                </div>
                            </li>
                            <hr className='width80'/>

                            <li className='individualRecipeListInstructions'>
                                <div className="number">
                                    <span className='bold'>5. </span>  
                                </div>
                                <div>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint assumenda rerum blanditiis quod, sequi dignissimos itaque ad asperiores? Enim, molestias.
                                </div>
                            </li>
                            
                            
                           
                        </ul></div>
                </div>
                </div>
                
            </div>
            <div className="contentBoxSide "></div>
        </div>


    )
}

export default IndividualRecipe