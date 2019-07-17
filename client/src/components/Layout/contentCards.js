import React , {useState, memo}from "react";
import RecipeCard from "./recipeCard";
import CookbookCard from "../cookbook/cookbookCard";
import CreateNewRecipeCard from "./createNewRecipeCard";
import CreateCookbook from "../cookbook/createCookbook";
import CreateCookbookModal from "../cookbook/createCookbookModal";
import './contentCards.css'

function ContentCards(props) {
  // put the confirmModals and settings menu Here

  const { data, navigation, totalPages, pageLimit, option } = props;
  
  const [createCookbookModal, setCreateCookbookModal] = useState(false)

  

  if (option === "recipe") {
    return (
      <>
        <div className="contentBoxCard">
          {data.map(recipe => {
            return (
              <RecipeCard recipe={recipe} key={recipe._id} option={option} />
            );
          })}
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

  if(option === 'cookbook'){
      return(
    <>
    <div className="contentBoxCard">
    {createCookbookModal &&
        <CreateCookbookModal
        setCreateCookbookModal = {setCreateCookbookModal}
        />
      }
      {data.map(cookbook => {
        return (
          <CookbookCard c={cookbook} key={cookbook._id} option={option} />
        );
      })}
        <CreateCookbook setCreateCookbookModal = {setCreateCookbookModal}  />
    </div>
  </>)
  }
}

export default memo(ContentCards);
