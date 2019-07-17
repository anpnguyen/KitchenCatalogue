import React, { useState, useEffect, useRef, memo } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadCookbookRecipes } from "../../actions/individualCookbook";

import { deleteCookbook, renameCookbookById } from "../../actions/cookbook";

import ConfirmModal from "../Layout/confirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

import CardSettingsMenu from "./cardSettingsMenu";

import "./cookbookCard.css";

function CookbookCard(props) {
  const {
    loadCookbookRecipes,
    history,
    cookbook,
    recipe,
    deleteCookbook,
    renameCookbookById,
    c
  } = props;

  const { cookbookTitle, cookbookImage, _id } = props.c;
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const [renameForm, setRenameForm] = useState({ newName: cookbookTitle });
  const [mouseOver, setMouseOver] = useState(false);

  const deleteModalRef = useRef();
  const renameModalRef = useRef();
  const settingCogRef = useRef();

  const handleSettingsMenuClick = e => {
    e.stopPropagation();
    setSettingsMenu(!settingsMenu);
  };

  const handleRenameConfirm = e => {
    e.preventDefault();
    setRenameModal(false);
    let data = {
      cookbookId: c._id,
      newCookbookTitle: renameForm.newName
    };
    renameCookbookById(data);
  };

  const handleDeleteConfirm = () => {
    setDeleteModal(false);
    deleteCookbook(_id);
  };

  const handleRenameChange = e => {
    setRenameForm({ ...renameForm, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleClickOutsideSettings = e => {
      e.stopPropagation();

      if (deleteModalRef.current.contains(e.target)) {
        return;
      } else {
        setDeleteModal(false);
      }
    };

    if (deleteModal) {
      document.addEventListener("mousedown", handleClickOutsideSettings);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSettings);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSettings);
    };
  }, [deleteModal]);

  useEffect(() => {
    const handleClickOutsideSettings = e => {
      e.stopPropagation();

      if (renameModalRef.current.contains(e.target)) {
        return;
      } else {
        setRenameModal(false);
      }
    };

    if (renameModal) {
      document.addEventListener("mousedown", handleClickOutsideSettings);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideSettings);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSettings);
    };
  }, [renameModal]);

  useEffect(() => {
    const handleClickOutsideSettings = e => {
      e.stopPropagation();
      console.log(settingCogRef);
      console.log(e.target);
      if (
        settingCogRef.current.contains(e.target) ||
        e.target.id === "deleteMenu" ||
        e.target.id === "renameMenu"
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

  // find cook book from the state,
  // it will identify the clicked book and load the indivdual cookbook State
  // push to cookbook/id
  const handleCookbookClicker = e => {
    e.preventDefault();

    // this identifies selected cookbook
    let selectedCookbook = cookbook.cookbooks.find(o => o._id === _id);
    // this fills the selected cookbook with recipes from recipe State
    let expandedRecipes = selectedCookbook.savedRecipes.map(mappedRecipe =>
      recipe.recipes.find(o => o._id === mappedRecipe)
    );

    // this loads the cookbook into the individualCookbookState
    let pushedCookbook = { ...selectedCookbook, savedRecipes: expandedRecipes };
    loadCookbookRecipes(pushedCookbook, history);
  };

  const handleMouseOver = () => {
    setMouseOver(true);
  };
  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  return (
    <>
      <ConfirmModal
        confirmAction={handleDeleteConfirm}
        closeAction={() => setDeleteModal(false)}
        id="deleteCookbookModal"
        ref={deleteModalRef}
        title={`Delete Cookbook`}
        text={`Are you sure you want to delete this cookbook?`}
        confirmationText="Delete"
        isShowing={deleteModal}
      />

      <ConfirmModal
        confirmAction={handleRenameConfirm}
        closeAction={() => setRenameModal(false)}
        id="renameCookbookModal"
        ref={renameModalRef}
        title={`Rename Cookbook`}
        text={`Please enter the new name of this cookbook`}
        confirmationText="Rename"
        isShowing={renameModal}
      >
        <form onSubmit={handleRenameConfirm}>
          <input
            value={renameForm.newName}
            name="newName"
            onChange={handleRenameChange}
            placeholder="Cookbook name"
          />
        </form>
      </ConfirmModal>

      <article
        className="recipeCard cookbook"
        onClick={e => handleCookbookClicker(e)}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        
          <CardSettingsMenu
            onClick={handleSettingsMenuClick}
            ref={settingCogRef}
            isShowing={settingsMenu}
            id="cookbookCog"
            isOpacity={mouseOver}
          >
            <span onClick={() => setRenameModal(true)}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            <span onClick={() => setDeleteModal(true)}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </CardSettingsMenu>
        

        <div className="recipeCardImage cookbook">
          {!cookbookImage ? (
            <div className="fillerImg"> </div>
          ) : (
            <img className="" src={cookbookImage} alt="" />
          )}
        </div>

        <div className="recipeCardText cookbook ">
          <div className="recipeCardTextTitle ">
            <h3>{cookbookTitle}</h3>
          </div>
        </div>
      </article>
    </>
  );
}

const mapStateToProps = state => ({
  cookbook: state.cookbook,
  recipe: state.recipe
});

export default memo(
  withRouter(
    connect(
      mapStateToProps,
      { loadCookbookRecipes, deleteCookbook, renameCookbookById }
    )(CookbookCard)
  )
);
