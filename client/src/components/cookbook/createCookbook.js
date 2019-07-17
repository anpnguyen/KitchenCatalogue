import React from "react";

// import {createNewCookbook} from '../../actions/cookbook'

// import "../Layout/contentCard.css";

const CreateCookbook = props => {
    const {setCreateCookbookModal} = props

   
  const handleClicker = () => {
    
    setCreateCookbookModal(true)
    
  };

  return (
    <div className="recipeCard cookbook" onClick={handleClicker}>
      {/* <div> */}
      <div className="recipeCardImage cookbook">
        <div className="fillerImgCreate"> + </div>
      </div>

      <div className="recipeCardText cookbook ">
        <div className="recipeCardTextTitle">
          <h3>Create A New Cookbook</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateCookbook;
