import React , {useEffect, Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import NavBar from '../Layout/navBar'
import Spinner from '../Layout/spinner'
import Footer from '../Layout/footer'
import Alert from '../Layout/alert'
import DeleteConfimation from './deleteConfirmation'

import {getRecipeById, deleteRecipe} from '../../actions/recipe'
import {connect} from 'react-redux'
import uuid from 'uuid/v4'

import{Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUtensils } from '@fortawesome/free-solid-svg-icons'

import './individualRecipe.css'




function IndividualRecipe(props){

    const { match, getRecipeById, deleteRecipe, history} = props
    const {title, imageUrl, servings, time, ingredients, instructions, user,_id} = props.recipe.recipe
    const {loading} = props.recipe
    const [isDelete, setIsDelete] = useState(false)

    useEffect(()=>{
        getRecipeById(match.params.recipe_id,history)
        
            },[getRecipeById, history, match  ])
            
    function handleDelete(){
        setIsDelete(true) 
    }

    function handleStateChange(value){
        setIsDelete(value)
    }

    function handleDeleteConfirmation(){
        deleteRecipe(history, match.params.recipe_id)
    }

    
 

    return(
        
        loading? 
            <>
                <NavBar/>
                <Spinner/>
            </>:
        
        <>
            <NavBar/>
            <Alert/>
                {isDelete &&
                <DeleteConfimation  handleStateChange={handleStateChange} handleDeleteConfirmation={handleDeleteConfirmation} isDelete={isDelete} />
                }

                <div className="contentBox ">
                    <div className="contentBoxContent ">    

                        <div className="individualRecipe" id="individualRecipe">
                          <h1 className="">{title}</h1>  
                            <div className="recipeDetails ">
                                <div className=''>
                                    <p><span className='bold'>By: </span> {user.username} </p>
                                    <p><span className="spanMargin"><span className='bold'><FontAwesomeIcon icon={faUtensils} /> Serves </span> {servings}</span>  <span className='bold'><FontAwesomeIcon icon={faClock} />Cooking Time:</span> {time}</p>      
                                </div>                             
                            </div> 

                            <div className='saveButton'>
                                <Link to={`/recipe/${_id}/edit`}><button className="blueButton" >Edit</button></Link>
                                <button className="blueButton" onClick={handleDelete}>Delete</button>                                
                            </div> 
                    
                        
                            <div className="imageContainer ">
                                {!imageUrl ? <div className="fillerImg"></div>: <img className='image' src={imageUrl} alt=""/>} 
                            </div>
                            <hr className="width80"/>   

                            <div className="recipeText">
                                <div className="ingredients ">
                                    <ul className="">
                                        <li className=' '><h3>Ingredients</h3>    </li>
                                        {ingredients.map( (ingredient, index) =>(
                                            <Fragment key={ingredient + index}>
                                            {/* <li> {`${ingredient.quantity} ${ingredient.unit} of ${ingredient.ingredientName}`}</li> */}
                                            <li>{ingredient}</li>
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
                                                        <span className='bold'>{index+1}. </span>  
                                                    </div>
                                                    <div >
                                                        {instruction}
                                                    </div>
                                                </li>
                                                <hr className='width80'/>
                                            </Fragment>))
                                        }
                                    </ul>
                                </div>
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