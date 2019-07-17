import React, { Fragment, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faUtensils,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { removeRecipeFromCookbook } from "../../actions/individualCookbook";
import { connect } from "react-redux";
import "./recipeCard.css";

import ConfirmModal from "./confirmModal";
import CardSettingMenu from "../cookbook/cardSettingsMenu";

const RecipeCard = props => {
  const { match, removeRecipeFromCookbook, option } = props;
  const { title, imageUrl, _id, servings, time } = props.recipe;

  const [settingsMenu, setSettingsMenu] = useState(false);
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);

  const deleteModalRef = useRef();
  const settingsMenuRef = useRef();

  const handleClicker = () => {
    props.history.push(`/recipe/${_id}`);
  };
  const removeFromCookbook = e => {
    e.stopPropagation();
    let data = { cookbookId: match.params.cookbook_id, recipeId: _id };
    removeRecipeFromCookbook(data);
  };

  const handleSettingsClick = e => {
    e.stopPropagation();
    setSettingsMenu(!settingsMenu);
  };

  // const handleDeleteClick = e => {
  //   e.stopPropagation();
  //   setSettingsMenu(false);
  //   setDeleteRecipeModal(true);
  // };

  const handleMouseOver = () => {
    setMouseOver(true);
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
    setSettingsMenu(false);
  };

  useEffect(() => {
    const handleClickOutsideDelete = e => {
      if (deleteModalRef.current.contains(e.target)) {
        return;
      }
      setDeleteRecipeModal(false);
    };

    if (deleteRecipeModal) {
      document.addEventListener("mousedown", handleClickOutsideDelete);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideDelete);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDelete);
    };
  }, [deleteRecipeModal]);

  useEffect(() => {
    const handleClickOutsideSettings = e => {
      e.stopPropagation();
      let tester = document.getElementById("cookbookCogRecipe");

      if (
        settingsMenuRef.current.contains(e.target) ||
        e.target.id === tester.id
      ) {
        return;
      } else {
        setSettingsMenu(false);
      }
    };

    if (settingsMenu) {
      document.addEventListener("mousedown", handleClickOutsideSettings);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSettings);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSettings);
    };
  }, [settingsMenu]);

  return (
    <>
      <ConfirmModal
        confirmAction={removeFromCookbook}
        closeAction={() => setDeleteRecipeModal(false)}
        id="deleteCookbookModal"
        ref={deleteModalRef}
        title={`Remove Recipe From Cookbook`}
        text={`Are you sure you want to remove this recipe from this cookbook?`}
        confirmationText="Remove"
        isShowing={deleteRecipeModal}
      />

      <div
        className="recipeCard "
        onClick={handleClicker}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {option === "cookbookRecipe" && (
          <CardSettingMenu
            onClick={handleSettingsClick}
            ref={settingsMenuRef}
            isShowing={settingsMenu}
            id="cookbookCogRecipe"
            isOpacity={mouseOver}
          >
            <span onClick={() => setDeleteRecipeModal(true)}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </CardSettingMenu>
        )}

        <div className="recipeCardImage">
          {!imageUrl ? (
            <div className="fillerImg" />
          ) : (
            <img className="" src={imageUrl} alt="" />
          )}
        </div>

        <div className="recipeCardTextBox ">
          <div className="recipeCardTextTitle ">
            <h3>{title}</h3>
          </div>

          <Fragment>
            <p className=" recipeCardText">
              <span className="bold">
                <FontAwesomeIcon icon={faUtensils} /> Servings: 
              </span>
              {servings?`  ${servings}`: ''}
            </p>
            <p className=" recipeCardText">
              <span className="bold">
                <FontAwesomeIcon icon={faClock} /> Cooking Time:
              </span>
              {time?`  ${time}`: ''}
            </p>
          </Fragment>
        </div>
      </div>
    </>
  );
};



export default withRouter(
  connect(
    null,
    { removeRecipeFromCookbook }
  )(RecipeCard)
);
