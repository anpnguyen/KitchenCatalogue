import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ContentContainer from "../../Layout/contentContainer/contentContainer";
import Spinner from "../../Layout/spinner";
import {
  editRecipePut,
  getRecipeById,
  createRecipe,
  updateRecipe_LS
} from "../../../actions/individualRecipe";
import { connect } from "react-redux";
import RecipeDetails from "../receipeDetails";
import RecipeIngredients from "../recipeIngredients";
import RecipeInstructions from "../recipeInstructions";
import PreviewContainer from "../previewRecipe/previewContainer";
import PreviewUsername from "../previewRecipe/PreviewUsername";
import PreviewText from "../previewRecipe/PreviewText";
import PreviewImage from "../previewRecipe/PreviewImage";
import PreviewTitle from "../previewRecipe/PreviewTitle";
import "../editIndividualRecipe/EditIndividualRecipe.css";


const CreateRecipe = props => {
  const {
    editRecipePut,
    history,
    option,
    createRecipe,
    match,    
    updateRecipe_LS,
    getRecipeById,
    auth
  } = props;

  const initialData = {
    title: "",
    imageUrl: "",
    servings: "",
    time: "",
    user: ""
  };

  const user = auth.user

  const [recipeDetails, setRecipeDetails] = useState(initialData);
  const { title, imageUrl, servings, time } = recipeDetails;
  const [recipeIngredients, setRecipeIngredients] = useState([""]);
  const [recipeInstructions, setRecipeInstructions] = useState([""]);
  const [newRecipeStage, setNewRecipeStage] = useState(1);

  // if item is in local storage

  useEffect(() => {
    
    if (option === "newRecipe") {
      setRecipeDetails({...recipeDetails,
        title: "",
        imageUrl: "",
        servings: "",
        time: ""
        
      });
      setRecipeIngredients([""]);
      setRecipeInstructions([""]);
    }
  }, [getRecipeById, updateRecipe_LS, match.params.recipe_id, option]);

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
      <ContentContainer {...props}>
        {auth.loading? (
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
                      <h1 className="text-center">Create Recipe</h1>
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
                          user={user.username}
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
      </ContentContainer>
    </>
  );
};

CreateRecipe.propTypes = {
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
)(CreateRecipe);
