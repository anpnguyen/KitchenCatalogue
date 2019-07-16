import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "../Layout/navBar";
import Alert from "../Layout/alert";
import Footer from "../Layout/footer";
import Spinner from "../Layout/spinner";
import { editRecipePut, getRecipeById , createRecipe } from "../../actions/individualRecipe";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { createRecipe } from "../../actions/recipe";
import PreviewContainer from "./previewContainer";
import RecipeDetails from "./receipeDetails";
import RecipeIngredients from "./recipeIngredients";
import RecipeInstructions from "./recipeInstructions";
import "./newRecipe.css";

const EditIndividualRecipe = props => {
  const { editRecipePut, history, recipe, auth, option, createRecipe, match } = props;
  const { user } = auth;


  const initialData = {
    title:  "",
    imageUrl:  "",
    servings:  "",
    time:  ""
  };

  const [recipeDetails, setRecipeDetails] = useState(initialData);
  const { title, imageUrl, servings, time } = recipeDetails;
  const [recipeIngredients, setRecipeIngredients] = useState(
    [""]
  
  );
  const [recipeInstructions, setRecipeInstructions] = useState(
    [""]

  );
  const [newRecipeStage, setNewRecipeStage] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      ...recipeDetails,
      ingredients: recipeIngredients,
      instructions: recipeInstructions
    };

    if (option === "edit") {
      editRecipePut(formData, history, match.params.recipe_id);
    } else {
      createRecipe(formData, history);
    }
  };

  const handleToNext = e => {
    e.preventDefault();
    setNewRecipeStage(newRecipeStage + 1);
  };

  const handleToBack = e => {
    e.preventDefault();
    setNewRecipeStage(newRecipeStage - 1);
  };

  useEffect(() => {
    if (option === 'edit') {
      let localRecipe = JSON.parse(localStorage.getItem("recipe"));
      // console.log(localRecipe)
      let {
        title,
        servings,
        imageUrl,
        time,
        ingredients,
        instructions
      } = localRecipe;
      setRecipeDetails({ title, servings, imageUrl, time });
      setRecipeIngredients(ingredients);
      setRecipeInstructions(instructions);
    
    } 
  }, [recipe.recipe.title, option]);



  return (
    <>
      <NavBar />
      <Alert />
      {recipe.loading === true && recipe.recipe === {} ? (
        <Spinner />
      ) : (
        <div className="contentBox ">
          <div className="contentBoxContent ">
            <main className="editRecipe" id="editRecipe">
              {option === "edit" ? (
                <h1 className="text-center">Edit Recipe</h1>
              ) : (
                <h1 className="text-center">New Recipe</h1>
              )}

              <hr className="width80" />
              <PreviewContainer
                newRecipeStage={newRecipeStage}
                user={user}
                title={title}
                servings={servings}
                time={time}
                imageUrl={imageUrl}
                option={option}
              />

              <div className="recipeForm">
                <form onSubmit={handleSubmit}>
                  <RecipeDetails
                    newRecipeStage={newRecipeStage}
                    user={user}
                    title={title}
                    servings={servings}
                    time={time}
                    imageUrl={imageUrl}
                    setRecipeDetails={setRecipeDetails}
                    recipeDetails={recipeDetails}
                    handleToNext={handleToNext}
                    option={option}
                  />

                  <RecipeIngredients
                    newRecipeStage={newRecipeStage}
                    handleToNext={handleToNext}
                    handleToBack={handleToBack}
                    setRecipeIngredients={setRecipeIngredients}
                    recipeIngredients={recipeIngredients}
                    option={option}
                  />

                  {/* instruction */}

                  <RecipeInstructions
                    newRecipeStage={newRecipeStage}
                    user={user}
                    title={title}
                    servings={servings}
                    time={time}
                    imageUrl={imageUrl}
                    setRecipeInstructions={setRecipeInstructions}
                    recipeInstructions={recipeInstructions}
                    handleToNext={handleToNext}
                    handleToBack={handleToBack}
                    handleSubmit={handleSubmit}
                    option={option}
                  />
                </form>
              </div>
            </main>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

EditIndividualRecipe.propTypes = {
  auth: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  editRecipePut: PropTypes.func.isRequired,
  getRecipeById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
});
export default withRouter(
  connect(
    mapStateToProps,
    { editRecipePut, getRecipeById, createRecipe }
  )(EditIndividualRecipe)
);
