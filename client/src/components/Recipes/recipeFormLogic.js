const {editRecipePut,history, recipe, auth, getRecipeById, match} = props
   const {user} = auth
 

    const initialData = {
        title:recipe.recipe.title,
        imageUrl: recipe.recipe.imageUrl,
        servings: recipe.recipe.servings,
        time: recipe.recipe.time
}
  

    const [recipeDetails, setRecipeDetails] = useState(initialData)  
  
    const {title, imageUrl, servings, time} = recipeDetails
    const [recipeIngredients, setRecipeIngredients] = useState(recipe.recipe.ingredients);
    const [recipeInstructions, setRecipeInstructions] = useState(recipe.recipe.instructions);
    const [newRecipeStage, setNewRecipeStage] = useState(1)


function handleDetailChange(e){
        setRecipeDetails({...recipeDetails, [e.target.name]: e.target.value})
    }


function handleIngredientNameChange(e, index) {
    const values = [...recipeIngredients];
    values[index].ingredientName = e.target.value;
    setRecipeIngredients(values);
  }
  
function handleIngredientAdd(e) {
      e.preventDefault()
    const values = [...recipeIngredients];
    values.push("");
    setRecipeIngredients(values);
    console.log(values)
  }

  function handleIngredientRemove(index) {
    const values = [...recipeIngredients];
    values.splice(index, 1);
    setRecipeIngredients(values);
  }



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
    console.log(formData)
    console.log(recipe.recipe._id)
    editRecipePut(formData, history, recipe.recipe._id)
}


function handleToNext(e){
    e.preventDefault();

    setNewRecipeStage(newRecipeStage +1)

}

function handleToBack(e){
    e.preventDefault();

    setNewRecipeStage(newRecipeStage -1)

}

export {handleDetailChange, 
        handleIngredientNameChange,
        handleIngredientAdd, 
        handleIngredientRemove,handleInstructionChange,handleInstructionAdd,handleInstructionRemove,
        handleSubmit,
        handleToNext,
        handleToBack
    }