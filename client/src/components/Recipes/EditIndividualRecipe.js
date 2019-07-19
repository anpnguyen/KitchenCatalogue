import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Content from "../Layout/content";
import Spinner from "../Layout/spinner";
import {
  editRecipePut,
  getRecipeById,
  createRecipe,
  updateRecipe_LS
} from "../../actions/individualRecipe";
import { connect } from "react-redux";
import PreviewContainer from "./previewContainer";
import RecipeDetails from "./receipeDetails";
import RecipeIngredients from "./recipeIngredients";
import RecipeInstructions from "./recipeInstructions";
import PreviewUsername from "./PreviewUsername";
import PreviewText from "./PreviewText";
import PreviewImage from "./PreviewImage";
import PreviewTitle from "./PreviewTitle";
import "./EditIndividualRecipe.css";

const EditIndividualRecipe = props => {
  const {
    editRecipePut,
    history,
    option,
    createRecipe,
    match,
    individualRecipe,
    updateRecipe_LS,
    getRecipeById
  } = props;

  const initialData = {
    title: "",
    imageUrl: "",
    servings: "",
    time: "",
    user: ""
  };

  const [recipeDetails, setRecipeDetails] = useState(initialData);
  const { title, imageUrl, servings, time, user } = recipeDetails;
  const [recipeIngredients, setRecipeIngredients] = useState([""]);
  const [recipeInstructions, setRecipeInstructions] = useState([""]);
  const [newRecipeStage, setNewRecipeStage] = useState(1);

  // if item is in local storage

  
  useEffect(() => {
    if (option === "edit") {
      var localRecipes = JSON.parse(localStorage.getItem("recipeState"));
      if (localRecipes === null) {
        getRecipeById(match.params.recipe_id);
      } else {
        var foundRecipe = localRecipes.find(
          recipe => recipe._id === match.params.recipe_id
        );

        if (!foundRecipe) {
          getRecipeById(match.params.recipe_id);
        } else {
          let {
            title,
            servings,
            imageUrl,
            time,
            ingredients,
            instructions,
            user
          } = foundRecipe;
          setRecipeDetails({ title, servings, imageUrl, time, user });
          setRecipeIngredients(ingredients);
          setRecipeInstructions(instructions);
          updateRecipe_LS(foundRecipe);
        }
      }
    }

    if (option === "newRecipe") {
      setRecipeDetails({
        title: "",
        imageUrl: "",
        servings: "",
        time: "",
        user: ""
      });
      setRecipeIngredients([""]);
      setRecipeInstructions([""]);
    }
  }, [getRecipeById, updateRecipe_LS, match.params.recipe_id, option ]);

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
  return (
    <>
      <Content {...props}>
        {individualRecipe.loading === true && option === "edit" ? (
          <Spinner />
        ) : (
          <main className="content">
            <div className="contentContainer">
              <div className="contentBox ">
                <div className="contentBoxContent ">
                  <main className="editRecipe" id="editRecipe">
                    {option === "edit" ? (
                      <h1 className="text-center">Edit Recipe</h1>
                    ) : (
                      <h1 className="text-center">New Recipe</h1>
                    )}

                    <hr className="width80" />
                    <PreviewContainer newRecipeStage={newRecipeStage}>
                      <PreviewTitle title={title} />
                      <PreviewUsername user={user} />
                      <PreviewText servings={servings} time={time} />
                      <PreviewImage imageUrl={imageUrl} title={title} />
                    </PreviewContainer>

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
                        />

                        <RecipeIngredients
                          newRecipeStage={newRecipeStage}
                          handleToNext={handleToNext}
                          handleToBack={handleToBack}
                          setRecipeIngredients={setRecipeIngredients}
                          recipeIngredients={recipeIngredients}
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
            </div>
          </main>
        )}
      </Content>
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
  recipe: state.recipe,
  individualRecipe: state.individualRecipe
});
export default connect(
  mapStateToProps,
  { editRecipePut, getRecipeById, createRecipe, updateRecipe_LS }
)(EditIndividualRecipe);
