import React from "react";

const CreateCookbook = props => {
  const { setCreateCookbookModal } = props;

  const handleClicker = () => {
    setCreateCookbookModal(true);
  };

  return (
    <div className="recipeCard cookbook" onClick={handleClicker}>     
      <div className="recipeCardImage cookbook">
        <div className="fillerImgCreate cookbook"> + </div>
      </div>

      <div className="recipeCardText cookbook ">
        <div className="recipeCardTextTitle cookbook">
          <h3>Create A New Cookbook</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateCookbook;
