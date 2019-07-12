import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../Recipes/individualRecipe.css";

function AddToCookbook(props) {
  const { setIsFavourite , cookbook } = props;
  const [size, setSize] = useState(1);
  
  const handleIsFavourite = () => {
    setIsFavourite(false);
  };

  const handleAddToCookbook = () => {
    alert("add to cookbook");
  };
  useEffect(() => {
    if (cookbook.cookbooks.length < 5) setSize(cookbook.cookbooks.length);
  }, []);
  const options = cookbook.cookbooks.map(cookbookOption => {
    return (
      <option value={cookbookOption.cookbookTitle}>
        {cookbookOption.cookbookTitle}
      </option>
    );
  });
  return (
    <div className="addFavourite">
      <h2>Which cook book do you want to add this to?</h2>
      

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
