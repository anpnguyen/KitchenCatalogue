import React from "react";

function recipeIngredients(props) {
  const {
    newRecipeStage,
    handleToNext,
    handleToBack,
    setRecipeIngredients,
    recipeIngredients,
    option

  } = props;

  const handleIngredientNameChange = (e, index) => {
    const values = [...recipeIngredients];
    values[index] = e.target.value;
    setRecipeIngredients(values);
  };

  const handleIngredientAdd = e => {
    e.preventDefault();
    const values = [...recipeIngredients];
    values.push("");
    setRecipeIngredients(values);
  };

  const handleIngredientRemove = index => {
    const values = [...recipeIngredients];
    values.splice(index, 1);
    setRecipeIngredients(values);
  };
  return (
    <>
      {newRecipeStage === 2 && (
        <div className="ingredientsContainer">
          <section className="ingredients">
            <div className="ingredientsItem">
              <h3>Ingredients</h3>
            </div>
            <div className="ingredientsItem">
              <div className="ingredientItemsLeft" />
              <div className="ingredientsItemRight">
                <div>Quantity</div>
                <div>Unit</div>
                <div className="NewRecipeName">Ingredient Name</div>
              </div>
            </div>
        {
          
        
            recipeIngredients.map((recipeIngredient, index) => {
              return (
                <div key={`${index}ingredient`} className="ingredientsItem">
                  <div className="ingredientsItemsLeft">
                    <label htmlFor={`${index}ingredient`}>
                      <h3>{index + 1}.</h3>
                    </label>
                  </div>
                  <div className="ingredientsItemRight">
                    <div className="NewRecipeName">
                      <input
                        type="text"
                        placeholder="Ingredient Name"
                        value={recipeIngredient || " "}
                        onChange={e => handleIngredientNameChange(e, index)}
                        name={`${index}ingredient`}
                      />
                      <button
                        className="blueButton"
                        type="button"
                        onClick={() => handleIngredientRemove(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
            
            
            }

            <div className="ingredientsItem addIngredientButton">
              <button className=" " onClick={e => handleIngredientAdd(e)}>
                Add Ingredient
              </button>
            </div>
          </section>
          <nav className="ingredientsItem ingredientNavButton">
            <button className="blueButton" onClick={e => handleToBack(e)}>
              Back{" "}
            </button>
            <button className="blueButton" onClick={e => handleToNext(e)}>
              Next
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

export default recipeIngredients;
