import React from "react";

// import {createNewCookbook} from '../../actions/cookbook'

import "../Layout/contentCard.css";

const CreateCookbook = props => {
    const {setCreateCookbookModal} = props

   
  const handleClicker = () => {
    
    setCreateCookbookModal(true)
    
  };

  return (
    <div className="contentCard " onClick={handleClicker}>
      {/* <div> */}
      <div className="ContentCardImage">
        <div className="fillerImgCreate"> + </div>
      </div>

      <div className="ContentCardText ">
        <div className="contentCardTitleContainer ">
          <h3>Create A New Cookbook</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateCookbook;
