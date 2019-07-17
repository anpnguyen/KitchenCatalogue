import React , {memo}from "react";
import RecipeDetailTitle from "./RecipeDetailTitle";
import RecipeDetailImage from "./RecipeDetailImage";
import RecipeDetailServings from "./RecipeDetailServings";
import RecipeDetailTime from "./RecipeDetailTime";

function receipeDetails(props) {
  const {
    title,
    servings,
    time,
    imageUrl,
    newRecipeStage,
    handleToNext,
    setRecipeDetails,
    recipeDetails
  } = props;

  const handleDetailChange = e => {
    setRecipeDetails({ ...recipeDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      {newRecipeStage === 1 && (
        <div className="recipeDetailsContainer">
          <section className="recipeDetails">
            <div className="recipeDetailsItem text-center">
              <h3>Recipe Details</h3>
            </div>
            {props.children}

            <RecipeDetailTitle
              title={title}
              handleDetailChange={handleDetailChange}
            />
            <RecipeDetailImage
              imageUrl={imageUrl}
              handleDetailChange={handleDetailChange}
            />
            <RecipeDetailServings
              servings={servings}
              handleDetailChange={handleDetailChange}
            />
            <RecipeDetailTime
              time={time}
              handleDetailChange={handleDetailChange}
            />

            <nav className="recipeDetailsItem">
              <button onClick={handleToNext} className="blueButton">
                Next
              </button>
            </nav>
          </section>
        </div>
      )}
    </>
  );
}

export default memo(receipeDetails);
