import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Content from "../Layout/content";
import Spinner from "../Layout/spinner";
import AddToCookbookSelect from "./addToCookbookSelect";

import {
  getRecipeById,
  deleteRecipe,
  updateRecipe_LS
} from "../../actions/individualRecipe";

import { addRecipeToCookbook } from "../../actions/cookbook";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./individualRecipe.css";
import ViewRecipeDetails from "./viewRecipeDetails";
import ViewRecipeIngredients from "./viewRecipeIngredients";
import ViewRecipeInstructions from "./viewRecipeInstructions";
import ConfirmModal from "../Layout/confirmModal";

const IndividualRecipe = props => {
  const {
    match,
    getRecipeById,
    deleteRecipe,
    history,
    individualRecipe,
    updateRecipe_LS,
    addRecipeToCookbook
  } = props;

  const { loading } = individualRecipe;
  const [isDelete, setIsDelete] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [addedCookbooks, setAddedCookbooks] = useState([]);

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

    console.log(localRecipes);

    if (!localRecipes) {
      getRecipeById(match.params.recipe_id, history);
    }

    if (localRecipes) {
      let foundRecipe = localRecipes.find(
        recipe => recipe._id === match.params.recipe_id
      );

      if (!foundRecipe) {
        history.push("/recipe");
      } else {
        updateRecipe_LS(foundRecipe);
      }

      console.log("updated recipe from LS");
    }
  }, []);

  const handleDelete = () => {
    setIsDelete(true);
  };

  const handleAddToCookbook = () => {
    // this picks out the selected cookbooks
    console.log(addedCookbooks)
    let selectedCookbooks = [addedCookbooks].map(
      addedCookbook => addedCookbook.value
    );
    console.log(selectedCookbooks);

    let cookbooksToSend = selectedCookbooks.filter(
      cookbook => cookbook.savedRecipes.includes(_id) === false
    );
    console.log(cookbooksToSend);

    let cookbookIds = cookbooksToSend.map(cookbookId => cookbookId._id);

    let data = { cookbookIds: cookbookIds, recipeId: _id };
    addRecipeToCookbook(data);
    setIsFavourite(false);
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
        <main className="content">
        <div className="contentContainer">
          <div className="contentBox ">
            <ConfirmModal
              confirmAction={handleDeleteConfirmation}
              closeAction={() => setIsDelete(false)}
              id="confirmDeleteRecipe"
              // ref={deleteModalRef}
              title={`Delete Recipe`}
              text={`Are you sure you want to delete this recipe?`}
              confirmationText="Delete"
              isShowing={isDelete}
            />

            <div className="contentBoxContent ">
              <ConfirmModal
                confirmAction={handleAddToCookbook}
                closeAction={() => setIsFavourite(false)}
                id="confirmDeleteRecipe"
                // ref={deleteModalRef}
                title={`Add Recipe To Cookbook`}
                text={`Which cookbook would you like to add this recipe to?`}
                confirmationText="Add"
                isShowing={isFavourite}
              >
                <AddToCookbookSelect setAddedCookbooks={setAddedCookbooks} />
              </ConfirmModal>

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
        </div>
        </main>
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
    updateRecipe_LS,
    addRecipeToCookbook
  }
)(IndividualRecipe);
