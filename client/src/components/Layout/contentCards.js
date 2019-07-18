import React, { useState, memo, Fragment } from "react";
import { connect } from "react-redux";
import RecipeCard from "./recipeCard";
import CookbookCard from "../cookbook/cookbookCard";
import CreateNewRecipeCard from "./createNewRecipeCard";
import CreateCookbook from "../cookbook/createCookbook";
// import CreateCookbookModal from "../cookbook/createCookbookModal";
import ConfirmModal from "./confirmModal";
import { createNewCookbook } from "../../actions/cookbook";
import "./contentCards.css";

function ContentCards(props) {
  // put the confirmModals and settings menu Here

  const { data, navigation, totalItems, pageLimit, option, createNewCookbook} = props;

  const [createCookbookModal, setCreateCookbookModal] = useState(false);
  const [formData, setFormData] = useState({ cookbookTitle: "" });

  const handleFormSubmit = e => {
    e.preventDefault();
    console.log(formData);
    setCreateCookbookModal(false);
    createNewCookbook(formData);
    setFormData({ cookbookTitle: "" })
  };

  const handleFormChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  console.log(navigation)
  console.log(totalItems)

  if (option === "recipe") {
    return (
      <>
        <div className="contentBoxCard">
          {data.map((recipe,index) => {
            
            if(
            index < navigation.end -1 &&
            index >= navigation.start &&
            index !== totalItems){          
            return (


              <RecipeCard recipe={recipe} key={recipe._id} option={option} />
            )} }
            
            
            
          
          )}
          <CreateNewRecipeCard />
        </div>
      </>
    );
  }

  if (option === "cookbookRecipe") {
    return (
      <>
        <div className="contentBoxCard">
          {data.map(recipe => {
            return (
              <RecipeCard recipe={recipe} key={recipe._id} option={option} />
            );
          })}
          {/* <CreateNewRecipeCard /> */}
        </div>
      </>
    );
  }
  if (option === "search") {
    return (
      <>
        <div className="contentBoxCard">
          {data.map(recipe => {
            return (
              <RecipeCard recipe={recipe} key={recipe._id} option={option} />
            );
          })}
          {/* <CreateNewRecipeCard /> */}
        </div>
      </>
    );
  }

  if (option === "cookbook") {
    return (
      <>
        <div className="contentBoxCard">
          <ConfirmModal
            confirmAction={handleFormSubmit}
            closeAction={() => setCreateCookbookModal(false)}
            id="deleteCookbookModal"
            title={`Create A Cookbook`}
            text={`Please enter a name for your new cookbook.`}
            confirmationText="Create"
            isShowing={createCookbookModal}
          >
            <form onSubmit={handleFormSubmit}>
              
              <input
                type="text"
                placeholder="Cookbook name"
                onChange={handleFormChange}
                name="cookbookTitle"
                value={formData.cookbookTitle}
              />
            </form>
          </ConfirmModal>

          {data.map(cookbook => {
            return (
              <CookbookCard c={cookbook} key={cookbook._id} option={option} />
            );
          })}
          <CreateCookbook setCreateCookbookModal={setCreateCookbookModal} />
        </div>
      </>
    );
  }
}

export default memo(
  connect(
    null,
    { createNewCookbook }
  )(ContentCards)
);

