import React, { useState } from "react";
import ReactDOM from "react-dom";
import NavBar from '../navBar'
import './newRecipe.css'

// import "./styles.css";

function NewRecipe() {
  const [recipeIngredients, setRecipeIngredients] = useState([{ quantity: null , unit:null, ingredientName:null}]);
  const [recipeInstructions, setRecipeInstructions] = useState([" "]);


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



  return(
    <>
        <NavBar/>
        <div className="contentBox">
            <div className="contentBoxContent height100">    
            <h1 className="text-center">Create a New Recipe</h1>
            <hr className='width80'/>
                <div className="newRecipe">
                    <div className='newRecipeForm'>
                        <form  classaction="">
                            <div className="newRecipeDetails">
                                <div className='newRecipeItem'>
                                    <div><label htmlFor="Title">Title: </label></div>
                                    {/* <div><input type="text" placeholder="Title" name="title" value={title} onChange={handleChange}/></div> */}
                                </div>
                                <div className='newRecipeItem'>
                                    <div><label htmlFor="ImageUrl">Image Url: </label></div>
                                    <div><input type="text" placeholder="Image Url"/></div>
                                </div>
                                <div className='newRecipeItem'>
                                    <div><label htmlFor="ImageUrl">Servings: </label></div>
                                    <div><input type="text" placeholder="Servings"/></div>
                                </div>
                                <div className='newRecipeItem'>
                                    <div><label htmlFor="ImageUrl">Cooking Time: </label></div>
                                    <div><input type="text" placeholder="Cooking Time"/></div>
                                </div>
                                <hr className="width80"/>
                            </div>
                            
                            
                            <div className="newRecipeIngredients ">
                                <h3>Ingredients</h3>
                                <div className="newRecipeIngredientsItems">
                                    <div className="newRecipeIngredientItem">
                                        <div >Quantity</div>
                                        <div >Unit</div>
                                        <div className="NewRecipeName">Ingredient Name</div>
                                    </div>
                                    
                                    {recipeIngredients.map((recipeIngredient, index) => {
                                        return (
                                        <div key={`${index} + ingredient`} className="newRecipeIngredientItem">
                                            
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
                                            // className="NewRecipeName"
                                            /> <button type="button" onClick={() => handleIngredientRemove(index)}>
                                            X
                                            </button></div>
                                            
                                        </div>
                                        );
                                    })}
                                
                                </div>
                                <button className="save" onClick={e=> handleIngredientAdd(e)}>Add Ingredient</button>
                            </div>

                            <div className="newRecipeInstruction ">
                                <h3>Instructions</h3>
                                <div className="newRecipeInstructionItems">
                                    
                                    {recipeInstructions.map( (recipeInstruction,i) => {
                                        // console.log(recipeInstruction)
                                        return(
                                        <div className="newRecipeInstructionItem" key ={`${i} + instruction`}>
                                            <div>{i+1}. </div>
                                            <div><textarea rows="4" onChange={(e)=>handleInstructionChange(e,i)} value={recipeInstruction}/></div>
                                            <div><button onClick={(e)=> handleInstructionRemove(i, e)}>X</button></div>
                                        </div>)
                                    

                                    })}
{/* 
                                    <div className="newRecipeInstructionItem">
                                        <div>1. </div>
                                        <div><textarea rows="4" /></div>
                                    </div>
                                    <div className="newRecipeInstructionItem">
                                        <div>2. </div>
                                        <div ><textarea rows="4" /></div>
                                    </div>
                                    <div className="newRecipeInstructionItem">
                                        <div>3. </div>
                                        <div ><textarea rows="4" /></div>
                                    </div> */}

                                </div>
                                <button className="save" onClick={e=> handleInstructionAdd(e)}>Add Instruction</button>
                            </div>


                            <div className="newRecipeButton">
                                <button className="save">Save</button>
                                <button className="save">Clear</button>
                            </div>
                        
                        </form>
                    </div>
                </div>           
            </div>
        </div>
    </>
)}

export default NewRecipe



// {fields.map((field, idx) => {
//     return (
//       <div key={`${idx}`}>
//         <input
//           type="text"
//           placeholder="Enter text"
//           value={field.value || ""}
//           onChange={e => handleChange(idx, e)}
//         />
//         <input
//           type="text"
//           placeholder="Enter text"
//           value={field.value2 || ""}
//           onChange={e => handleChange2(idx, e)}
//         />
//         <input
//           type="text"
//           placeholder="Enter text"
//           value={field.value3 || ""}
//           onChange={e => handleChange3(idx, e)}
//           required
//         />
//         <button type="button" onClick={() => handleRemove(idx)}>
//           X
//         </button>
//       </div>
//     );
//   })}