import React, { Fragment, useState , useRef, useEffect, useCallback} from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils, faCog } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import { clearRecipe } from "../../actions/recipe";
import { removeRecipeFromCookbook } from "../../actions/cookbook";
import { connect } from "react-redux";
import "./contentCard.css";
// import CardSettingsIcon from "./cardSettingsIcon";
import CardSettingsMenu from "./cardSettingsMenu";
import CardDeleteModal from "./cardDeleteModal";

const ContentCard = props => {
  const { text, clearRecipe, option, match, removeRecipeFromCookbook } = props;
  const { title, imageUrl, _id, servings, time } = props.recipe;
  const [settingsMenu, setSettingsMenu] = useState(false);
  const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);

  const deleteModalRef = useRef();
  const settingsMenuRef = useRef();

  const handleClicker = () => {
    clearRecipe();
    if (!_id) {
      props.history.push(`/recipe/new`);
    } else {
      props.history.push(`/recipe/${_id}`);
    }
  };

  const removeFromCookbook = e => {
    e.stopPropagation();
    // pass thorugh cookbook Id
    let data = { cookbookId: match.params.cookbook_id, recipeId: _id };
    removeRecipeFromCookbook(data);
  };

  const handleSettingsClick = e => {
    e.stopPropagation();
    
    setSettingsMenu(!settingsMenu);
    
  };
 

  const handleDeleteClick = e => {
    e.stopPropagation();
    setSettingsMenu(false);
    setDeleteRecipeModal(true)
    
  };


  useEffect(() => {
    const handleClickOutsideDelete = e => {
      if (
        deleteModalRef.current.contains(e.target )
      ) {
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
      e.stopPropagation()
      let tester  = document.getElementById('tester')
      
      
      if (
        settingsMenuRef.current.contains(e.target) || e.target.id === tester.id
       
      ) {
 
        return;
      } else{
        
        
        // console.log('calling from useEffect')
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
    {deleteRecipeModal &&
    <span ref={deleteModalRef}>
    <CardDeleteModal
      removeFromCookbook = {removeFromCookbook}
      setDeleteRecipeModal = {setDeleteRecipeModal}
      id='tester'
           

    />
    </span>
    }
    <article className="contentCard " onClick={handleClicker}>
      {option === "cookbookRecipes" && (
        <div
          onClick={handleSettingsClick}
          className={`removeFromCookbook ${settingsMenu ? "invertColor": ''}`}
          id='tester'
        >
          
          {settingsMenu? 'x': <FontAwesomeIcon icon={faCog} />}
        </div>
      )}
      <div onClick={handleDeleteClick} ref={settingsMenuRef}>
        {settingsMenu === true && <CardSettingsMenu />}
      </div>

      <div className="ContentCardImage">
        {!imageUrl && props.titleText && (
          <div className="fillerImgCreate"> + </div>
        )}
        {!imageUrl && !props.titleText && <div className="fillerImg" />}
        {imageUrl && <img className="" src={imageUrl} alt="" />}
      </div>

      <div className="ContentCardText ">
        <div className="contentCardTitleContainer ">
          {props.titleText && <h3> {props.titleText}</h3>}
          <h3>{title}</h3>
        </div>

        {text && !props.titleText && (
          <Fragment>
            <p className=" recipeText">
              <span className="bold">
                <FontAwesomeIcon icon={faUtensils} /> Servings:{" "}
              </span>{" "}
              {servings}
            </p>
            <p className=" recipeText">
              <span className="bold">
                <FontAwesomeIcon icon={faClock} /> Cooking Time:{" "}
              </span>{" "}
              {time}
            </p>
          </Fragment>
        )}
      </div>
      {/* </div> */}
    </article>
    </>
  );
};

ContentCard.propTypes = {
  clearRecipe: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { clearRecipe, removeRecipeFromCookbook }
  )(ContentCard)
);
