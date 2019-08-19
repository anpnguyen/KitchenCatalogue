import React from "react";

const CreateCookbook = props => {
  const { setCreateCookbookModal } = props;

  const handleClicker = () => {
    setCreateCookbookModal(true);
  };

  return (
    <div className="cookbookCard" onClick={handleClicker}>     
      <div className="cookbookCardImage">
        <div className="fillerImg cookbook create "> + </div>
      </div>

      <div className="cookbookCardText ">
        <div className="cookbookCardTextTitle">
          <h3>Create A New Cookbook</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateCookbook;
