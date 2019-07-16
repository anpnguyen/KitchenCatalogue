import React, {
    Fragment,
    useState,
    useRef,
    useEffect
  } from "react";
  import PropTypes from "prop-types";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {
    faClock,
    faUtensils,
    faCog,
    faTrash
  } from "@fortawesome/free-solid-svg-icons";
  import { withRouter } from "react-router-dom";
  import { clearRecipe } from "../../actions/recipe";
  import { removeRecipeFromCookbook } from "../../actions/individualCookbook";
  import { connect } from "react-redux";
  import "./contentCard.css";
  
  import ConfirmModal from "./confirmModal";
  import CardSettingMenu from "../cookbook/cardSettingsMenu";
  
  const RecipeCard = props => {
    const {  clearRecipe, match, removeRecipeFromCookbook } = props;
    const { title, imageUrl, _id, servings, time } = props.recipe;
    
    const [settingsMenu, setSettingsMenu] = useState(false);
    const [deleteRecipeModal, setDeleteRecipeModal] = useState(false);
  
    const deleteModalRef = useRef();
    const settingsMenuRef = useRef();
  
    const handleClicker = () => {    
        props.history.push(`/recipe/${_id}`);
      }
    ;
  
    const removeFromCookbook = e => {
        e.stopPropagation();
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
      setDeleteRecipeModal(true);
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
  
        <div className="contentCard " onClick={handleClicker}>
          {/* {option === "cookbookRecipes" && !props.titleText &&
             
  
            <CardSettingMenu
              onClick={handleSettingsClick}
              ref={settingsMenuRef}
              isShowing={settingsMenu}
              id="cookbookCogRecipe"
            >
              <span onClick={() => setDeleteRecipeModal(true)}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </CardSettingMenu>
          } */}
  
            <div className="ContentCardImage">
                {!imageUrl ? <div className="fillerImg" />: <img className="" src={imageUrl} alt="" />}
            </div>
  
          <div className="ContentCardText ">
            <div className="contentCardTitleContainer ">
                    <h3>{title}</h3>
            </div>
  
         
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
           
          </div>
        
        </div>
      </>
    );
  };
  
  RecipeCard.propTypes = {
    clearRecipe: PropTypes.func.isRequired
  };
  
  export default withRouter(
    connect(
      null,
      { clearRecipe, removeRecipeFromCookbook }
    )(RecipeCard)
  );
  