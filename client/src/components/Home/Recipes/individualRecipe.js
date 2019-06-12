import React , {useEffect, Fragment} from 'react'
import './individualRecipe.css'
import {getRecipeById} from '../../../actions/recipe'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import uuid from 'uuid/v4'
import NavBar from '../../Home/navBar'

import{Link} from 'react-router-dom'

function IndividualRecipe(props){

    const { match, getRecipeById} = props
    const {title, imageUrl, servings, time, ingredients, instructions, user,_id} = props.recipe.recipe
    // const {username} = props.recipe.recipe.user
    const {loading} = props.recipe

    useEffect(()=>{
        getRecipeById(match.params.recipe_id)
        
    },[getRecipeById,match.params.recipe_id ])

        
        
   
        

    return(
        
        loading? <h1>Loading</h1> :
        <>
        <NavBar/>

        <div className="contentBox">
            
            <div className="contentBoxContent ">    

            
                
                <div className="individualRecipe ">
                <h1 className="">{title}</h1>  
                <div className="individualRecipeDetails ">
                    <div className=''>
                        <p><span className='bold'>By: </span> {user.username} </p>
                        <p><span className="spanMargin"><span className='bold'>Serves </span> {servings}</span>  <span className='bold'>Cooking Time:</span> {time}</p>      
                    </div>
                                   

                </div> 
                <div className='individualRecipeSave'>
                        <button>Save</button>
                        <Link to={`/recipe/${_id}/edit`}><button >Edit</button></Link>
                    </div> 
               
                <hr className="width80"/>
                <div className="text-center ">
                    <img className='image' src={imageUrl} alt=""/>
                </div>

                <div className="individualRecipeText">
                    <div className="ingredients  ">
                        <ul className="">
                            <li className=' '>Ingredients</li>
                            {ingredients.map( (ingredient, index) =>(
                                <Fragment key={ingredient._id}>
                                <li> {`${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredientName}`}</li>
                                </Fragment>
                            ))}
                            
                            {/* <li className=''>1 cup of Sugar</li>
                            <li className=''>1 cup of Meat</li>
                            <li className=''>100 grams of  flour or brown flour</li>
                            <li className=''>1 cup of water</li>
                            <li className=''>2 slice of bread</li> */}
                            
                           
                        </ul>
                    </div>
                    <div className="instructions "> 
                    
                    
                    <ul className="individualRecipeInstructions">
                            
                            <li className='individualRecipeList bold color'>Instructions</li>

                            {instructions.map( (instruction, index) =>(
                                <Fragment key={uuid()}>
                                <li className='individualRecipeListInstructions'>
                                    <div className="number">
                                        <span className='bold'>{index+1} </span>  
                                    </div>
                                    <div >
                                        {instruction}
                                    </div>
                            </li>
                            <hr className='width80'/>
                            </Fragment>))}

                            {/* <li className='individualRecipeListInstructions'>
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
                            </li> */}
                            
                            
                           
                        </ul></div>
                </div>
                </div>
                
            </div>
            {/* <div className="contentBoxSide "></div> */}
        </div>
        </>

    )
}



IndividualRecipe.propTypes = {
    getRecipeById: PropTypes.func.isRequired,
    
    recipe:PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    
    recipe: state.recipe
    
})

export default connect(mapStateToProps , {getRecipeById})(IndividualRecipe)