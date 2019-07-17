import React, { memo } from "react";
import PropTypes from "prop-types";

function RecipeDetailTitle(props) {
  const { title, handleDetailChange } = props;

const handleChange = ()=>{
  
}

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
