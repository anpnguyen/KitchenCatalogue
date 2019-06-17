import React , {useEffect, Fragment} from 'react'
import './individualRecipe.css'
import {getRecipeById} from '../../../actions/recipe'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import uuid from 'uuid/v4'
import NavBar from '../../Home/navBar'
import {deleteRecipe} from '../../../actions/recipe'
import{Link} from 'react-router-dom'
import Spinner from '../../Layout/spinner'
import Footer from '../../Home/footer'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUtensils } from '@fortawesome/free-solid-svg-icons'
import Alert from '../../Layout/alert'

function IndividualRecipe(props){

    const { match, getRecipeById, deleteRecipe, history} = props
    const {title, imageUrl, servings, time, ingredients, instructions, user,_id} = props.recipe.recipe
    
    const {loading} = props.recipe

    useEffect(()=>{
        getRecipeById(match.params.recipe_id,history)
        
            },[getRecipeById ])
            // ,match.params.recipe_id
    
    



    function handleDelete(){
        deleteRecipe(history, match.params.recipe_id)
    }

 

    return(
        
        loading? <><NavBar/><Spinner/></>:
        <>
        <NavBar/>
        <Alert/>

        <div className="contentBox backgroundWhite">
            
            <div className="contentBoxContent backgroundWhite">    

            
                
                <div className="individualRecipe ">
                <h1 className="">{title}</h1>  
                <div className="individualRecipeDetails ">
                    <div className=''>
                        <p><span className='bold'>By: </span> {user.username} </p>
                        <p><span className="spanMargin"><span className='bold'><FontAwesomeIcon icon={faUtensils} /> Serves </span> {servings}</span>  <span className='bold'><FontAwesomeIcon icon={faClock} />Cooking Time:</span> {time}</p>      
                    </div>
                                   

                </div> 
                <div className='individualRecipeSave'>
                    <Link to={`/recipe/${_id}/edit`}><button >Edit</button></Link>
                    <button onClick={handleDelete}>Delete</button>
                        
                </div> 
               
                {/* <hr className="width80"/> */}
                <div className="text-center individualRecipeImageContainer ">
                    {!imageUrl ? <div className="fillerImg"></div>: <img className='image' src={imageUrl} alt=""/>} 
                    {/* <img className='image' src={imageUrl} alt=""/> */}

                </div>
                <hr className="width80"/>

                <div className="individualRecipeText">
                    <div className="ingredients  ">
                        <ul className="">
                            <li className=' '><h3>Ingredients</h3>    </li>
                            {ingredients.map( (ingredient, index) =>(
                                <Fragment key={ingredient._id}>
                                <li> {`${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredientName}`}</li>
                                </Fragment>
                            ))}
                            
                                                 
                           
                        </ul>
                    </div>
                    <div className="instructions "> 
                    
                    
                    <ul className="individualRecipeInstructions">
                            
                            <li className='individualRecipeList bold color'><h3>Instructions</h3>  </li>

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

                                                      
                            
                           
                        </ul></div>
                </div>
                </div>
                
            </div>
            
        </div>
        <Footer/>
        </>

    )
}



IndividualRecipe.propTypes = {
    getRecipeById: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
        
    recipe:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
    recipe: state.recipe
    
})

export default withRouter(connect(mapStateToProps , {getRecipeById, deleteRecipe})(IndividualRecipe))