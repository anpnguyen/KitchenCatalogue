import React, { memo } from "react";

function RecipeDetailTitle(props) {
  const { title, handleDetailChange } = props;

  return (
    <div className="recipeDetailsItem ">
      <div>
        <label htmlFor="Title">
          <h5>Title:</h5>
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={handleDetailChange}
        />
      </div>
    </div>
  );
}

RecipeDetailTitle.propTypes = {};

export default memo(RecipeDetailTitle);
