import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../Recipes/individualRecipe.css";
import AddToCookbookSelect from "./addToCookbookSelect";
import {addRecipeToCookbook} from '../../actions/cookbook'

function AddToCookbook(props) {
  const { setIsFavourite,  recipeId , cookbook, addRecipeToCookbook} = props;
  
  const [size, setSize] = useState(1);

  const [addedCookbooks, setAddedCookbooks] = useState([]);

 

  const handleIsFavourite = () => {
    setIsFavourite(false);
  };

  const handleAddToCookbook = () => {
    // formats the state
    let selectedCookbooks = addedCookbooks.map( addedCookbook => (addedCookbook.value))
    console.log(selectedCookbooks)

    // selects cookbooks that dont have this recipe
    let cookbooksToSend = selectedCookbooks.filter(cookbook => cookbook.savedRecipes.includes(recipeId) === false)

    // formats to only have cookbookIds
    let cookbookIds = cookbooksToSend.map( cookbookId => cookbookId._id  )
    console.log(cookbookIds)

    // sends cookbookIds and recipeId

    let data = {cookbookIds:cookbookIds, recipeId:recipeId}
    addRecipeToCookbook(data)
    setIsFavourite(false)

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
  {addRecipeToCookbook}
)(AddToCookbook);
