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
import { updateFromLS } from "../../actions/recipe";
import { getCookbooks, updateCookbookFromLS } from "../../actions/cookbook";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

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
    cookbook,
    getCookbooks,
    updateCookbookFromLS,
    individualRecipe,
    updateRecipe_LS
  } = props;

  const { loading } = individualRecipe;
  const [isDelete, setIsDelete] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const [recipeData, setRecipeData] = useState({
    title: "",
    imageUrl: "",
    servings: "",
    time: "",
    ingredients: [],
    instructions: [],
    user: ""
  });

  let {
    title,
    imageUrl,
    servings,
    time,
    ingredients,
    instructions,
    user,
    _id
  } = recipeData;

  useEffect(() => {
    var localRecipes = JSON.parse(localStorage.getItem("recipeState"));

    if (!localRecipes) {
      getRecipeById(match.params.recipe_id, history);
    }

    if (localRecipes) {
      let foundRecipe = localRecipes.find(
        recipe => recipe._id === match.params.recipe_id
      );
      setRecipeData({
        title: foundRecipe.title,
        imageUrl: foundRecipe.imageUrl,
        servings: foundRecipe.servings,
        time: foundRecipe.time,
        ingredients: foundRecipe.ingredients,
        instructions: foundRecipe.instructions,
        user: foundRecipe.user,
        _id: foundRecipe._id
      });

      updateRecipe_LS(foundRecipe);
    }
  }, []);

  useEffect(() => {
    setRecipeData({
      title: individualRecipe.recipe.title,
      imageUrl: individualRecipe.recipe.imageUrl,
      servings: individualRecipe.recipe.servings,
      time: individualRecipe.recipe.time,
      ingredients: individualRecipe.recipe.ingredients,
      instructions: individualRecipe.recipe.instructions,
      user: individualRecipe.recipe.user,
      _id: individualRecipe.recipe._id
    });
  }, [individualRecipe]);

  // useEffect(() => {
  //   if (localStorage.cookbookState && cookbook.loading) {
  //     let oldState = JSON.parse(localStorage.getItem("cookbookState"));
  //     updateCookbookFromLS(oldState);
  //   } else {
  //     cookbook.loading && getCookbooks();
  //   }
  // }, []);

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
  recipe: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe,
  cookbook: state.cookbook,
  individualRecipe: state.individualRecipe
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getRecipeById,
      deleteRecipe,
      getCookbooks,
      updateCookbookFromLS,
      updateRecipe_LS
    }
  )(IndividualRecipe)
);
