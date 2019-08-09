import React, { memo } from "react";

function RecipeDetailServings(props) {
  const { servings, handleDetailChange } = props;

  return (
    <div className="recipeDetailsItem">
      <div>
        <label htmlFor="servings">
          <h5>Servings:</h5>{" "}
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Servings"
          name="servings"
          value={servings}
          onChange={handleDetailChange}
        />
      </div>
    </div>
  );
}

export default memo(RecipeDetailServings);
