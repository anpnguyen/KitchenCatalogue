import React, { memo } from "react";

function RecipeDetailImage(props) {
  const { imageUrl, handleDetailChange } = props;

  return (
    <div className="recipeDetailsItem">
      <div>
        <label htmlFor="ImageUrl">
          <h5>Image Url:</h5>{" "}
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Image Url"
          name="imageUrl"
          value={imageUrl}
          onChange={handleDetailChange}
        />
      </div>
    </div>
  );
}

export default memo(RecipeDetailImage);
