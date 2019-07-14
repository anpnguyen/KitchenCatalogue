  import React, {useState} from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadCookbookRecipes, deleteCookbook, renameCookbookById } from "../../actions/cookbook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ConfirmModal from '../Layout/confirmModal'


import "../Layout/contentCard.css";

function CookbookCard(props) {
  const { loadCookbookRecipes, history, cookbook, recipe, deleteCookbook, renameCookbookById, c } = props;
  const { cookbookTitle, cookbookImage, _id } = props.c;
  const [settingsMenu, setSettingsMenu] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [renameModal, setRenameModal] = useState(false)



  const handleSettingsMenuClick = (e)=>{
    e.stopPropagation();
    setSettingsMenu(!settingsMenu)
  }

  const handleDeleteClick= (e)=>{
    e.stopPropagation();
    setDeleteModal(!deleteModal)
  }

  const handleRenameClick= (e)=>{
    e.stopPropagation();
    setRenameModal(!renameModal)
  }

  const handleRenameConfirm = ()=>{
    setRenameModal(false);
    let data = {
      cookbookId: c._id,
      newCookbookTitle: 'this is the new title'
    }
    renameCookbookById(data)
  }

  const handleDeleteConfirm = ()=>{
    console.log('calling')
    setDeleteModal(false);
    deleteCookbook(_id)

  }

  // make the modal,
  // click outside listener




  const handleCookbookClicker = e => {
    e.preventDefault();
    let selectedCookbook = cookbook.cookbooks.find(o => o._id === _id);
    let expandedRecipes =
     
      selectedCookbook.savedRecipes.map(mappedRecipe =>
        recipe.recipes.find(o => o._id === mappedRecipe)
      );

    console.log(selectedCookbook);

    let pushedCookbook = { ...selectedCookbook, savedRecipes: expandedRecipes };

    loadCookbookRecipes(pushedCookbook, history);

  };
  return (
<>  

{deleteModal && 
  <>
    <ConfirmModal
    confirmAction={handleDeleteConfirm}
    closeAction={()=>setDeleteModal(false)}
    />
   
    </>
      }

{renameModal && 
    <ConfirmModal
      confirmAction={handleRenameConfirm}
      closeAction={()=>setRenameModal(false)}
    />
      }

    <article className="contentCard " onClick={e => handleCookbookClicker(e)}>
      <div className='removeFromCookbook' onClick={handleSettingsMenuClick}>
        {settingsMenu? 'x ' : <FontAwesomeIcon icon={faCog} />}
      </div>
  
     
  
     

    {settingsMenu &&
      <div className='settingsMenu'>

          <p onClick={handleDeleteClick}>delete</p>
          <p onClick={handleRenameClick}> rename</p>
      </div>
      }


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
