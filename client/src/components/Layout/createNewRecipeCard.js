import React from "react";
import { withRouter } from "react-router-dom";

function CreateNewRecipeCard(props) {
  const { history } = props;

  const handleClick = e => {
    history.push("/recipe/new");
  };

  return (
    <div className="recipeCard" onClick={handleClick}>
      <div className="recipeCardImage">
        <div className="fillerImgCreate"> + </div>
      </div>

      <div className="recipeCardText ">
        <div className="recipeCardTextTitle">
          <h3>Create A New Recipe</h3>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CreateNewRecipeCard);
