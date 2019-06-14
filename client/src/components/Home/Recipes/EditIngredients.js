import React from 'react'

function EditIngredients(){
    return(
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
                        // className="NewRecipeName"
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
        </div>    
    )
}

export default EditIngredients