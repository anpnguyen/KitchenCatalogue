import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadCookbookRecipes,
  deleteCookbook,
  renameCookbookById
} from "../../actions/cookbook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from "../Layout/confirmModal";

import "../Layout/contentCard.css";

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
  const [renameForm, setRenameForm] = useState({newName:""});

  const deleteModalRef = useRef()
  const renameModalRef = useRef()
  const settingCogRef = useRef()

  const handleSettingsMenuClick = e => {
    e.stopPropagation();
    setSettingsMenu(!settingsMenu);
  };

  const handleDeleteClick = e => {
    e.stopPropagation();
    setSettingsMenu(false);
    setDeleteModal(!deleteModal);
  };

  const handleRenameClick = e => {
    e.stopPropagation();
    setSettingsMenu(false);
    setRenameModal(!renameModal);
  };

  const handleRenameConfirm = () => {
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

  const handleRenameChange =  e =>{
    setRenameForm({...renameForm, [e.target.name]:e.target.value })
  }

  useEffect(() => {
    const handleClickOutsideSettings = e => {
      e.stopPropagation()
                 
      if (
        deleteModalRef.current.contains(e.target)            
      ) {
         return;
      } else{
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
      e.stopPropagation()
                 
      if (
       renameModalRef.current.contains(e.target)            
      ) {
         return;
      } else{
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
      e.stopPropagation()
      console.log(e.target.id)
      console.log(settingCogRef)
      if (
       settingCogRef.current.contains(e.target)  || e.target.id === 'deleteMenu' || 'renameMenu'            
      ) {
         return;
      } else{
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





// it will identify the clicked book and load the indivdual cookbook State
  const handleCookbookClicker = e => {
    e.preventDefault();
    let selectedCookbook = cookbook.cookbooks.find(o => o._id === _id);
    let expandedRecipes = selectedCookbook.savedRecipes.map(mappedRecipe =>
      recipe.recipes.find(o => o._id === mappedRecipe)
    );
    console.log(selectedCookbook);
    let pushedCookbook = { ...selectedCookbook, savedRecipes: expandedRecipes };
    loadCookbookRecipes(pushedCookbook, history);
  };




  return (
    <>
      {deleteModal && (
        // <span ref={deleteModalRef}>
        <ConfirmModal
          confirmAction={handleDeleteConfirm}
          closeAction={() => setDeleteModal(false)}
          id='deleteCookbookModal'
          ref={deleteModalRef}
        >
          <h1>this is come</h1>
        </ConfirmModal>
        // </span>
      )}

      {renameModal && (
        <ConfirmModal
          confirmAction={handleRenameConfirm}
          closeAction={() => setRenameModal(false)}
          id='renameCookbookModal'
          ref={renameModalRef}
        >
          <form >
            <input value={renameForm.newName} name='newName' onChange={handleRenameChange}/>
          </form>
        </ConfirmModal>
      )}

      <article className="contentCard " onClick={e => handleCookbookClicker(e)}>
        <div className="removeFromCookbook" onClick={handleSettingsMenuClick} id='cookbookCog' ref={settingCogRef}>
          {settingsMenu ? "x " : <FontAwesomeIcon icon={faCog} />}
        </div>

        {settingsMenu && (
          <div className="settingsMenu">
            <p onClick={handleDeleteClick} id='deleteMenu'>delete</p>
            <p onClick={handleRenameClick} id='renameMenu'> rename</p>
          </div>
        )}

        <div className="ContentCardImage">
          {!cookbookImage ? (
            <div className="fillerImg"> </div>
          ) : (
            <img className="" src={cookbookImage} alt="" />
          )}
        </div>

        <div className="ContentCardText ">
          <div className="contentCardTitleContainer ">
            <h3>{cookbookTitle}</h3>
          </div>

          <div />
        </div>
      </article>
    </>
  );
}

const mapStateToProps = state => ({
  cookbook: state.cookbook,
  recipe: state.recipe
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadCookbookRecipes, deleteCookbook, renameCookbookById }
  )(CookbookCard)
);
