import React from "react";
import { withRouter } from "react-router-dom";

function CreateNewRecipeCard(props) {
  const { history } = props;

  const handleClick = e => {
    history.push("/recipe/new");
  };

  return (
    <div className="contentCard" onClick={handleClick}>
      <div className="ContentCardImage">
        <div className="fillerImgCreate"> + </div>
      </div>

      <div className="ContentCardText ">
        <div className="contentCardTitleContainer ">
          <h3>Create A New Recipe</h3>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CreateNewRecipeCard);
