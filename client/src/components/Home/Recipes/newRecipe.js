import React, { useState, useEffect } from "react";

import NavBar from '../navBar'
import './newRecipe.css'

import {createRecipe} from '../../../actions/recipe'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUtensils } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../Home/footer'

// import Alert from '../../Layout/alert'

// import "./styles.css";

function NewRecipe(props) {

    const {createRecipe,history, recipe, auth} = props
    const {user} = auth
    const initialData = {
        title:"",
        imageUrl:"",
        servings:"",
        time:""
}
    const [recipeDetails, setRecipeDetails] = useState(initialData)  
    const {title, imageUrl, servings, time} = recipeDetails
    const [recipeIngredients, setRecipeIngredients] = useState([{ quantity: null , unit:null, ingredientName:null}]);
    const [recipeInstructions, setRecipeInstructions] = useState([" "]);
    const [newRecipe, setNewRecipe] = useState('Details')

//  Detail Logic

    function handleDetailChange(e){
        setRecipeDetails({...recipeDetails, [e.target.name]: e.target.value})
    }

//   Ingredient Logic
  function handleQuantityChange(e, index) {
    const values = [...recipeIngredients];
    values[index].quantity = e.target.value;
    setRecipeIngredients(values);
  }

  function handleUnitChange(e, index) {
    const values = [...recipeIngredients];
    values[index].unit = e.target.value;
    setRecipeIngredients(values);
  }
  function handleIngredientNameChange(e, index) {
    const values = [...recipeIngredients];
    values[index].ingredientName = e.target.value;
    setRecipeIngredients(values);
  }
  
  function handleIngredientAdd(e) {
      e.preventDefault()
    const values = [...recipeIngredients];
    values.push({ quantity: " " , unit:" ", ingredientName:" "});
    setRecipeIngredients(values);
    console.log(values)
  }

  function handleIngredientRemove(index) {
    const values = [...recipeIngredients];
    values.splice(index, 1);
    setRecipeIngredients(values);
  }

//   Instruction Logic

function handleInstructionChange(e, index) {
    const valuesInstructions = [...recipeInstructions];
    console.log(valuesInstructions)
    valuesInstructions[index] = e.target.value;
    setRecipeInstructions(valuesInstructions);
  }

function handleInstructionAdd(e) {
    e.preventDefault()
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions.push(" ");
    console.log(valuesInstructions)
    setRecipeInstructions(valuesInstructions)
    
}

function handleInstructionRemove(index,e) {
    e.preventDefault()
    const valuesInstructions = [...recipeInstructions];
    console.log(valuesInstructions)
    valuesInstructions.splice(index, 1);
    setRecipeInstructions(valuesInstructions);
}

function handleSubmit(e){
    e.preventDefault()
    const formData = {...recipeDetails, ingredients: recipeIngredients, instructions: recipeInstructions}
    // console.log(formData)
    createRecipe(formData, history)

    }



  return(

    

    <>
        <NavBar/>
            
        <div className="contentBox">
            <div className="contentBoxContent height100">    
            
            {/* <hr className='width80'/> */}
                <div className="newRecipe">                    
                <h1 className="text-center">Create a New Recipe</h1>
                <hr className="width80"/>
                {/* <h3 className="text-center"> Recipe Preview</h3>   */}
                {/* *****PREVIEW */}

                <div className="newRecipePreviewContainer">
                    
                    <div className="newRecipePreview">
                    
                    <div className="newRecipePreviewItem">
                            
                       </div>
                       {user !== null &&
                       <>
                       <div className="newRecipePreviewItem">
                            <h1 className="">{!title? "My Recipe Title": title}</h1>  
                       </div>
                       
                       
                        <div className="newRecipePreviewItem">
                            <p><span className='bold'>By: </span> {user.username} </p>
                        </div>
                        <div className="newRecipePreviewItem">
                                <p>
                                    <span className="spanMargin">
                                        <span className='bold'>
                                            <FontAwesomeIcon icon={faUtensils} /> Serves 
                                        </span> {servings}
                                    </span>  
                                    <span className='bold'>
                                        <FontAwesomeIcon icon={faClock} />Cooking Time:
                                    </span> {time}
                                </p> 
                        </div>
                        <div className="newRecipePreviewItem">
                            {!imageUrl ? <div className="fillerImg"></div>: <img className='image' src={imageUrl} alt=""/>}
                        </div>

                        </>
                       } 
                            
                            
                                
                            
                                        

                    </div> 
                        
                </div>
            {/* </div> */}

                    <div className='newRecipeForm'>
                        <form  onSubmit={handleSubmit}>
                            <div className="newRecipeDetailsContainer">
                                <div className="newRecipeDetails">
                                    <div className='newRecipeItem text-center'>
                                        <h3>Recipe Details</h3>
                                        
                                    </div>
                                    <div className='newRecipeItem text-center'>
                                        <div><label htmlFor="Title"><h5>Title:</h5> </label></div>
                                        <div><input type="text" placeholder="Title" name="title" value={title} onChange={handleDetailChange} /></div>
                                    </div>
                                    <div className='newRecipeItem'>
                                        <div><label htmlFor="ImageUrl"><h5>Image Url:</h5> </label></div>
                                        <div><input type="text" placeholder="Image Url" name = "imageUrl" value={imageUrl} onChange={handleDetailChange}/></div>
                                    </div>
                                    <div className='newRecipeItem'>
                                        <div><label htmlFor="ImageUrl"><h5>Servings:</h5> </label></div>
                                        <div><input type="text" placeholder="Servings" name ="servings" value={servings} onChange={handleDetailChange}/></div>
                                    </div>
                                    <div className='newRecipeItem'>
                                        <div><label htmlFor="ImageUrl"><h5>Cooking Time:</h5> </label></div>
                                        <div><input type="text" placeholder="Cooking Time" name="time" value={time} onChange={handleDetailChange}/></div>
                                    </div>
                                    {/* <hr className="width80"/> */}
                                </div>
                                
                            </div>
                            
{/*                           
                            <div className="newRecipeIngredientsContainer">
                                <div className="newRecipeIngredients">
                                <div className="newRecipeIngredientItem">
                                    <h3>Ingredients</h3>
                                </div>
                                <div className="newRecipeIngredientItem">
                                    
                                        <div className='newIngredientItemLeft'>
                                            
                                        </div>
                                        <div className='newIngredientItemRight'> 
                                            <div >Quantity</div>
                                            <div >Unit</div>
                                            <div className="NewRecipeName">Ingredient Name</div>
                                        </div>
                                       
                                </div>
                                    
                                    {recipeIngredients.map((recipeIngredient, index) => {
                                        return (
                                        <div key={`${index} + ingredient`} className="newRecipeIngredientItem">
                                            <div className='newIngredientItemLeft'>
                                                <h3>{index+1}.</h3>
                                            </div>
                                            <div className='newIngredientItemRight'>
                                            <div><input
                                            type="text"
                                            placeholder="Quantity"
                                            value={recipeIngredient.quantity || " "}
                                            onChange={e => handleQuantityChange(e, index)}
                                            /></div>
                                            <div><input
                                            type="text"
                                            placeholder="Unit"
                                            value={recipeIngredient.unit || " "}
                                            onChange={e => handleUnitChange(e, index)}
                                            /></div>
                                            <div className="NewRecipeName"><input
                                            type="text"
                                            placeholder="Ingredient Name"
                                            value={recipeIngredient.ingredientName || " "}
                                            onChange={e => handleIngredientNameChange(e, index)}
                                            
                                            /> <button type="button" onClick={() => handleIngredientRemove(index)}>
                                            X
                                            </button></div>
                                            </div>
                                            
                                        </div>
                                        );
                                    })}
                                
                                
                                <div className="width100 text-center">
                                    <button className="addIngredientButton" onClick={e=> handleIngredientAdd(e)}>Add Ingredient</button>
                                </div>

                                </div>
                            </div> */}

{/* 
                            <div className="newRecipeInstructionContainer ">
                                <div className='newRecipeInstruction'>
                      
                                    
                                    {recipeInstructions.map( (recipeInstruction,i) => {
                                   
                                        return(
                                        <div className="newRecipeInstructionItem" key ={`${i} + instruction`}>
                                            <div className='newRecipeInstructionLeft'><h3>{i+1}.</h3> </div>
                                            <div className='newRecipeInstructionRight'><textarea rows="4" onChange={(e)=>handleInstructionChange(e,i)} value={recipeInstruction}/><button onClick={(e)=> handleInstructionRemove(i, e)}>X</button></div>
                                            
                                        </div>)
                                    

                                    })}

                                
                                
                                <button className="addInstructionButton" onClick={e=> handleInstructionAdd(e)}>Add Instruction</button>
                                <div className="newRecipeButton">
                                <button className="save">Save</button>
                                <button className="save">Clear</button>
                            </div>
                            </div>


                            
                            </div>
                         */}
                        </form>
                        
                    </div>
                </div>           
            </div>
        </div>
        <Footer/>
    </>
)}





NewRecipe.propTypes = {
    
    auth: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    createRecipe: PropTypes.func.isRequired


}

// this is the state that the current component has available to it
const mapStateToProps = state => ({
    auth: state.auth,
    recipe: state.recipe
    
})
export default withRouter(connect(mapStateToProps, {createRecipe})(NewRecipe))
