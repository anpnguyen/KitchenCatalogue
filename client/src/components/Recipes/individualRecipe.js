import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Content from "../Layout/content";
import Spinner from "../Layout/spinner";
import DeleteConfimation from "./deleteConfirmation";
import AddToCookbook from "./addToCookbook";
import {
  getRecipeById,
  deleteRecipe,
  updateRecipe_LS
} from "../../actions/individualRecipe";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./individualRecipe.css";
import ViewRecipeDetails from "./viewRecipeDetails";
import ViewRecipeIngredients from "./viewRecipeIngredients";
import ViewRecipeInstructions from "./viewRecipeInstructions";

const IndividualRecipe = props => {
  const {
    match,
    getRecipeById,
    deleteRecipe,
    history,
    individualRecipe,
    updateRecipe_LS
  } = props;

  const { loading } = individualRecipe;
  const [isDelete, setIsDelete] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  let {
    title,
    imageUrl,
    servings,
    time,
    ingredients,
    instructions,
    user,
    _id
  } = individualRecipe.recipe;

  useEffect(() => {
    var localRecipes = JSON.parse(localStorage.getItem("recipeState"));

    if (!localRecipes) {
      getRecipeById(match.params.recipe_id, history);
    }

    if (localRecipes) {
      let foundRecipe = localRecipes.find(
        recipe => recipe._id === match.params.recipe_id
      );

      updateRecipe_LS(foundRecipe);
      console.log("updated recipe from LS");
    }
  }, []);

  const handleDelete = () => {
    setIsDelete(true);
  };

  const handleStateChange = value => {
    setIsDelete(value);
  };

  const handleDeleteConfirmation = () => {
    deleteRecipe(history, match.params.recipe_id);
  };

  const handleCookbookClick = () => {
    setIsFavourite(true);
  };

  return (
    <Content {...props}>
      {loading || title === undefined ? (
        <Spinner />
      ) : (
        <>
          <div className="contentBox ">
            {isDelete && (
              <DeleteConfimation
                handleStateChange={handleStateChange}
                handleDeleteConfirmation={handleDeleteConfirmation}
                isDelete={isDelete}
              />
            )}
            <div className="contentBoxContent ">
              {isFavourite && (
                <AddToCookbook
                  setIsFavourite={setIsFavourite}
                  recipeId={match.params.recipe_id}
                />
              )}

              <main className="individualRecipe" id="individualRecipe">
                <h1 className="">{title}</h1>
                <ViewRecipeDetails
                  user={user}
                  servings={servings}
                  time={time}
                />

                <div className="saveButton">
                  <Link to={`/recipe/${_id}/edit`}>
                    <button className="blueButton">Edit</button>
                  </Link>
                  <button className="blueButton" onClick={handleDelete}>
                    Delete
                  </button>
                  <button className="blueButton" onClick={handleCookbookClick}>
                    Add to cookbook
                  </button>
                </div>

                <section className="imageContainer ">
                  {!imageUrl ? (
                    <div className="fillerImg" />
                  ) : (
                    <img className="image" src={imageUrl} alt={title} />
                  )}
                </section>
                <hr className="width80" />

                <div className="recipeText">
                  <ViewRecipeIngredients ingredients={ingredients} />
                  <ViewRecipeInstructions instructions={instructions} />
                </div>
              </main>
            </div>
          </div>
        </>
      )}
    </Content>
  );
};

IndividualRecipe.propTypes = {
  getRecipeById: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  individualRecipe: state.individualRecipe
});

export default connect(
  mapStateToProps,
  {
    getRecipeById,
    deleteRecipe,
    updateRecipe_LS
  }
)(IndividualRecipe);
