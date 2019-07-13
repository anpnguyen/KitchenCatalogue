import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../Recipes/individualRecipe.css";
import AddToCookbookSelect from "./addToCookbookSelect";

function AddToCookbook(props) {
  const { setIsFavourite, cookbook, recipeId } = props;
  const { cookbooks } = cookbook;
  const [size, setSize] = useState(1);

  const [cookbooksIn, setCookbooksIn] = useState();

  const handleIsFavourite = () => {
    setIsFavourite(false);
  };

  const handleAddToCookbook = () => {
    alert("add to cookbook");
  };

  useEffect(() => {
    const result = cookbooks.filter(individualCookbook =>
      individualCookbook.savedRecipes.includes(recipeId)
    );
    setCookbooksIn(result);
  }, []);

  return (
    <div className="addFavourite">
      <h2>Which cook book do you want to add this to?</h2>
      <AddToCookbookSelect cookbooksIn={cookbooksIn} />

      <div className={`${size === 5 ? "hideButtons" : ""} favouriteButtons`}>
        <button className="blueButton" onClick={handleAddToCookbook}>
          Add to Cookbook
        </button>

        <button className="blueButton" onClick={handleIsFavourite}>
          No
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  cookbook: state.cookbook
});

export default connect(
  mapStateToProps,
  {}
)(AddToCookbook);
