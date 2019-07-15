import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadCookbookRecipes,
  deleteCookbook,
  renameCookbookById
} from "../../actions/cookbook";

import ConfirmModal from "../Layout/confirmModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTimes, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Layout/contentCard.css";
import CardSettingsMenu from "./cardSettingsMenu";

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
  const [renameForm, setRenameForm] = useState({newName: cookbookTitle});

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

  const handleRenameConfirm = (e) => {
    e.preventDefault()
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
      
      if (
       settingCogRef.current.contains(e.target)  || e.target.id === 'deleteMenu' || e.target.id ===  'renameMenu'            
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
      
        <ConfirmModal
          confirmAction={handleDeleteConfirm}
          closeAction={() => setDeleteModal(false)}
          id='deleteCookbookModal'
          ref={deleteModalRef}
          title={`Delete Cookbook`}
          text={`Are you sure you want to delete this cookbook?`}
          confirmationText='Delete'
          isShowing={deleteModal}
        >
          
        </ConfirmModal>
        
      

      
        <ConfirmModal
          confirmAction={handleRenameConfirm}
          closeAction={() => setRenameModal(false)}
          id='renameCookbookModal'
          ref={renameModalRef}
          title={`Rename Cookbook`}
          text={`Please enter the new name of this cookbook`}
          confirmationText='Rename'
          isShowing={renameModal}
        >
          <form onSubmit={handleRenameConfirm}>
            <input value={renameForm.newName} name='newName' onChange={handleRenameChange} placeholder='Cookbook name' />
          </form>
        </ConfirmModal>
      

      <article className="contentCard " onClick={e => handleCookbookClicker(e)}>


       <CardSettingsMenu
          onClick={handleSettingsMenuClick}
          ref={settingCogRef}
          isShowing={settingsMenu}
          id='cookbookCog'
        >
        <span onClick={()=> setRenameModal(true)}> 
         <FontAwesomeIcon icon={faPencilAlt} />
         </span>
         <span onClick={()=> setDeleteModal(true)}> 
         <FontAwesomeIcon icon={faTrash} /> 
         </span>
       </CardSettingsMenu>

       

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
