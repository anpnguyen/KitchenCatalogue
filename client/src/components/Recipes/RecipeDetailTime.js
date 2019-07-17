import React, { memo } from "react";

function RecipeDetailTime(props) {
  const { time, handleDetailChange } = props;

  return (
    <div className="recipeDetailsItem">
      <div>
        <label htmlFor="time">
          <h5>Cooking Time:</h5>{" "}
        </label>
      </div>
      <div>
        <input
          type="text"
          placeholder="Cooking Time"
          name="time"
          value={time}
          onChange={handleDetailChange}
        />
      </div>
    </div>
  );
}

export default memo(RecipeDetailTime);
