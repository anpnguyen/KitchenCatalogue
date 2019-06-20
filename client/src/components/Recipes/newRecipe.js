import React, { useState, useEffect, useRef, useRouter } from "react";

import NavBar from '../Layout/navBar'
import './newRecipe.css'

import {createRecipe} from '../../actions/recipe'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faUtensils } from '@fortawesome/free-solid-svg-icons'
import Footer from '../Layout/footer'
import Alert from '../Layout/alert'



function NewRecipe(props) {
    
    const {createRecipe,history, auth} = props
    const {user} = auth
    const initialData = {
        title:"",
        imageUrl:"",
        servings:"",
        time:""
}
    const [recipeDetails, setRecipeDetails] = useState(initialData)  
    const {title, imageUrl, servings, time} = recipeDetails
    const [recipeIngredients, setRecipeIngredients] = useState([""]);
    const [recipeInstructions, setRecipeInstructions] = useState([""]);
    const [newRecipeStage, setNewRecipeStage] = useState(1)
    // const  { pathname, search } = useRouter();
   
//  Detail Logic

    function handleDetailChange(e){
        setRecipeDetails({...recipeDetails, [e.target.name]: e.target.value})
    }


  function handleIngredientNameChange(e, index) {
    const values = [...recipeIngredients];
    values[index] = e.target.value;
    setRecipeIngredients(values);    
  }
  
  function handleIngredientAdd(e) {
     e.preventDefault()
    const values = [...recipeIngredients];
    values.push("");
    setRecipeIngredients(values);    
  }

  function handleIngredientRemove(index) {
    const values = [...recipeIngredients];
    values.splice(index, 1);
    setRecipeIngredients(values);
  }

//   Instruction Logic

function handleInstructionChange(e, index) {
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions[index] = e.target.value;
    setRecipeInstructions(valuesInstructions);
  }

function handleInstructionAdd(e) {
    e.preventDefault()
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions.push("");    
    setRecipeInstructions(valuesInstructions)
    
}

function handleInstructionRemove(index,e) {
    e.preventDefault()
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions.splice(index, 1);
    setRecipeInstructions(valuesInstructions);
}

function handleSubmit(e){
    e.preventDefault()
    const formData = {...recipeDetails, ingredients: recipeIngredients, instructions: recipeInstructions}
    createRecipe(formData, history)

}

function handleToNext(e){
    e.preventDefault();    
    setNewRecipeStage(newRecipeStage +1);
    
    
}

function handleToBack(e){
    e.preventDefault();    
    setNewRecipeStage(newRecipeStage -1)
}

return(  

    <>
        <NavBar/>
        <Alert/>
            
        <div className="contentBox" >
            <div className="contentBoxContent ">              
            
                <main className="newRecipe" id="newRecipe">                    
                    <h1 className="text-center">Create a New Recipe</h1>
                    <hr className="width80"/>               

                    {newRecipeStage === 1 && 
                    <div className="previewContainer">
                    
                        <section className="preview">
                        
                    
                            {user !== null &&
                                <>
                                    <div className="previewItem">
                                        <h1 className="">{!title? "My Recipe Title": title}</h1>  
                                    </div>
                                                                
                                    <div className="previewItem">
                                        <p><span className='bold'>By: </span> {user.username} </p>
                                    </div>
                                    <div className="previewItem lastP">
                                        <p>
                                            <span className="spanMargin">
                                                <span className='bold'>
                                                    <FontAwesomeIcon icon={faUtensils} /> Serves: 
                                                </span> {servings}
                                            </span>  
                                            <span className='bold'>
                                                <FontAwesomeIcon icon={faClock} />Cooking Time:
                                            </span> {time}
                                        </p> 
                                    </div>

                                    <div className="previewItem">
                                        {!imageUrl ? <div className="fillerImg"></div>: <img className='image' src={imageUrl} alt=""/>}                               
                                    </div>                            
                                </>
                            } 
                        </section>                       
                    </div>
                    }
            

                    <div className='recipeForm' >
                        <form  onSubmit={handleSubmit}>
                            {newRecipeStage === 1 &&
                            <div className="recipeDetailsContainer">
                                <section className="recipeDetails">
                                    <div className='recipeDetailsItem text-center'>
                                        <h3>Recipe Details</h3>                                        
                                    </div>
                                    <div className='recipeDetailsItem '>
                                        <div><label htmlFor="Title"><h5>Title:</h5> </label></div>
                                        <div><input type="text" placeholder="Title" name="title" value={title} onChange={handleDetailChange} /></div>
                                    </div>
                                    <div className='recipeDetailsItem'>
                                        <div><label htmlFor="ImageUrl"><h5>Image Url:</h5> </label></div>
                                        <div><input type="text" placeholder="Image Url" name = "imageUrl" value={imageUrl} onChange={handleDetailChange}/></div>
                                    </div>
                                    <div className='recipeDetailsItem'>
                                        <div><label htmlFor="servings"><h5>Servings:</h5> </label></div>
                                        <div><input type="text" placeholder="Servings" name ="servings" value={servings} onChange={handleDetailChange}/></div>
                                    </div>
                                    <div className='recipeDetailsItem'>
                                        <div><label htmlFor="time"><h5>Cooking Time:</h5> </label></div>
                                        <div><input type="text" placeholder="Cooking Time" name="time" value={time} onChange={handleDetailChange}/></div>
                                    </div>
                                    <nav className='recipeDetailsItem'>                                        
                                        <button onClick={handleToNext} className="blueButton">Next</button>
                                    </nav>                                    
                                </section>
                                
                            </div>}

                            
                            
                           {newRecipeStage === 2 &&
                            <div className="ingredientsContainer">
                                <section className="ingredients">
                                    <div className="ingredientsItem">
                                        <h3>Ingredients</h3>
                                    </div>
                                
                                    
                                    {recipeIngredients.map((recipeIngredient, index) => {
                                        return (
                                        <div key={`${index} + ingredient`} className="ingredientsItem">
                                            <div className='ingredientsItemLeft'>
                                                <label htmlFor={`${index}ingredient`}>
                                                    <h3>{index+1}.</h3>
                                                </label>
                                            </div>
                                            <div className='ingredientsItemRight'>
                                            
                                                <div className="">
                                                    <input
                                                        name={`${index}ingredient`}
                                                        type="text"
                                                        placeholder="Ingredient Name"
                                                        value={recipeIngredients[index] || " "}
                                                        onChange={e => handleIngredientNameChange(e, index)}                                            
                                                    /> 
                                                    <button className='blueButton'
                                                        type="button" 
                                                        onClick={() => handleIngredientRemove(index)}
                                                    >X                                            
                                                    </button>
                                                </div>
                                            </div>                                            
                                        </div>
                                        );
                                    })}
                                    <div className="ingredientsItem addIngredientButton">                                    
                                        <button className="blueButton " onClick={e=> handleIngredientAdd(e)}>Add Ingredient</button>                          
                                    </div>     
                                </section>
                                <nav className="ingredientsItem ingredientNavButton">
                                    <button className="blueButton" onClick={e=> handleToBack(e)}>Back </button>
                                    <button className="blueButton" onClick={e=> handleToNext(e)}>Next</button>
                                </nav>
                            </div> }

                                            {/* instruction */}

                            {newRecipeStage ===3 &&
                            <div className="instructionsContainer ">
                                <section className='instructions'>                      
                                    <div className="instructionsItem ">
                                        <h3>Instructions</h3>
                                    </div>
                                    {recipeInstructions.map( (recipeInstruction,i) => {                                   
                                        return(
                                        <div className="instructionsItem" key ={`${i} + instruction`}>
                                            <div className='instructionsItemLeft'>
                                                <label htmlFor={`${i}instruction`}>
                                                    <h3>{i+1}.</h3> 
                                                </label>
                                            </div>
                                            <div className='instructionsItemRight'>
                                                <textarea name={`${i}instruction`} rows="4" onChange={(e)=>handleInstructionChange(e,i)} value={recipeInstruction}/>]
                                                <button className='blueButton' onClick={(e)=> handleInstructionRemove(i, e)}>X</button>
                                            </div>
                                            
                                        </div>)                                   

                                    })}

                                
                                    <div className="instructionsItem addInstructionButton">
                                    <button className="blueButton" onClick={e=> handleInstructionAdd(e)}>Add Instruction</button>
                                    </div>
                              
                                </section>

                                <nav className=" instructionsItem instructionsNavButton">
                                        <button className="blueButton" onClick={e=> handleToBack(e)}>Back </button>
                                        <button className="blueButton" onClick={e=> handleSubmit(e)}>Submit</button>
                                </nav>
                            
                            </div>}                                                
                        
                        </form>
                        
                    </div>
                </main>           
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


const mapStateToProps = state => ({
    auth: state.auth,
    recipe: state.recipe
    
})
export default withRouter(connect(mapStateToProps, {createRecipe})(NewRecipe))
