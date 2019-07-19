import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Content from "../Layout/content";
import Spinner from "../Layout/spinner";
import AddToCookbookSelect from "./addToCookbookSelect";
import ViewRecipeDetails from "./viewRecipeDetails";
import ViewRecipeIngredients from "./viewRecipeIngredients";
import ViewRecipeInstructions from "./viewRecipeInstructions";
import ConfirmModal from "../Layout/confirmModal";
import {
  getRecipeById,
  deleteRecipe,
  updateRecipe_LS
} from "../../actions/individualRecipe";
import { addRecipeToCookbook } from "../../actions/cookbook";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./individualRecipe.css";

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
    }
  }, []);

  const handleDelete = () => {
    setIsDelete(true);
  };

  const handleAddToCookbook = () => {
    // this picks out the selected cookbooks
    let selectedCookbook = addedCookbooks.value;
    // check if recipe is already in cookbook
    // find id not equal to recipe
    let IsRecipeAlreadyInside = selectedCookbook.savedRecipes.find(
      o => o._id === _id
    );

    if (IsRecipeAlreadyInside === undefined) {
      let data = { cookbookId: selectedCookbook._id, recipeId: _id };
      addRecipeToCookbook(data);
      setIsFavourite(false);
    } else {
      setIsFavourite(false);
    }
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
                    <button
                      className="blueButton"
                      onClick={handleCookbookClick}
                    >
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
