import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NavBar from "../Layout/navBar";
import Spinner from "../Layout/spinner";
import Footer from "../Layout/footer";
import Alert from "../Layout/alert";
import DeleteConfimation from "./deleteConfirmation";
import AddToCookbook from "./addToCookbook";
import { getRecipeById, deleteRecipe } from "../../actions/recipe";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import "./individualRecipe.css";
import ViewRecipeDetails from "./viewRecipeDetails";
import ViewRecipeIngredients from "./viewRecipeIngredients";
import ViewRecipeInstructions from "./viewRecipeInstructions";

const IndividualRecipe = props => {
  const { match, getRecipeById, deleteRecipe, history } = props;
  const {
    title,
    imageUrl,
    servings,
    time,
    ingredients,
    instructions,
    user,
    _id
  } = props.recipe.recipe;
  const { loading } = props.recipe;
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    getRecipeById(match.params.recipe_id, history);
  }, [getRecipeById, history, match]);

  const handleDelete = () => {
    setIsDelete(true);
  };

  const handleStateChange = value => {
    setIsDelete(value);
  };

  const handleDeleteConfirmation = () => {
    deleteRecipe(history, match.params.recipe_id);
  };

  const [isFavourite, setIsFavourite] = useState(false);

  const handleCookbookClick = () => {
    setIsFavourite(true);
  };

  return loading ? (
    <>
      <NavBar />
      <Spinner />
    </>
  ) : (
    <>
      <NavBar />

      <div className="contentBox ">
        {isDelete && (
          <DeleteConfimation
            handleStateChange={handleStateChange}
            handleDeleteConfirmation={handleDeleteConfirmation}
            isDelete={isDelete}
          />
        )}
        <div className="contentBoxContent ">
          <Alert />

          {isFavourite && 
          <AddToCookbook 
            setIsFavourite = {setIsFavourite}
            recipeId = {match.params.recipe_id}
            
          />}

          <main className="individualRecipe" id="individualRecipe">
            <h1 className="">{title}</h1>
            <ViewRecipeDetails user={user} servings={servings} time={time} />

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
      <Footer />
    </>
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
  recipe: state.recipe
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRecipeById, deleteRecipe }
  )(IndividualRecipe)
);
