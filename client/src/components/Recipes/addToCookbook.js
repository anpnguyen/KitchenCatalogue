import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../Recipes/individualRecipe.css";
import AddToCookbookSelect from "./addToCookbookSelect";

function AddToCookbook(props) {
  const { setIsFavourite,  recipeId , cookbook} = props;
  
  const [size, setSize] = useState(1);

  const [addedCookbooks, setAddedCookbooks] = useState([]);

 

  const handleIsFavourite = () => {
    setIsFavourite(false);
  };

  const handleAddToCookbook = () => {
    let selectedCookbooks = addedCookbooks.map( addedCookbook => (addedCookbook.value))
    console.log(selectedCookbooks)

    let toAdd = selectedCookbooks.filter(cookbook => cookbook.savedRecipes.includes(recipeId) === false)

    console.log(toAdd)



    // recipe ID
    // cookbook id
    // take cookbook ID, loook in saved recipes, if present, do nothin - 
    // if not present, add to mongo pUT requet

    // let positiveCookbooks = cookbook.cookbooks.filter( individualCookbook => individualCookbook.savedRecipes.includes(recipeId) )
    // this should print out all cookbook that have this 
    // console.log(positiveCookbooks)



    // 
    // client side seach
    
    // add recipe to cookbooks
  };

  

  return (
    <div className="addFavourite">
      <h2>Which cook book do you want to add this to?</h2>
      <AddToCookbookSelect 
        setAddedCookbooks = {setAddedCookbooks}
      />

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
