import React from "react";
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadCookbookRecipes} from '../../actions/cookbook'

import "../Layout/contentCard.css";

function CookbookCard(props) {

const {loadCookbookRecipes, history, cookbook, recipe} = props
const { cookbookTitle, cookbookImage, _id } = props.c;
// const { clearCookbook, getCookbookById ,history, title} = props

const handleCookbookClicker = (e) => {
e.preventDefault();
let selectedCookbook = cookbook.cookbooks.find(o => o._id === _id)
let expandedRecipes = 
//     !selectedCookbook.savedRecipes  ? ['this is working'] :
    selectedCookbook.savedRecipes.map( mappedRecipe =>
    (recipe.recipes.find(o=>o._id === mappedRecipe))
   
)

console.log(selectedCookbook)

let pushedCookbook = {...selectedCookbook, savedRecipes: expandedRecipes}



loadCookbookRecipes(pushedCookbook, history)
// console.log(pushedCookbook)
// history.push(`/cookbook/${_id}`)

};
return (
<article className="contentCard " onClick={(e)=> handleCookbookClicker(e)}>
{/* <div> */}
<div className="ContentCardImage">
{!cookbookImage ? (
<div className="fillerImg"> </div>
) : (
<img className="" src={cookbookImage} alt="" />
)}
</div>

<div className="ContentCardText ">
<div className="contentCardTitleContainer ">
<h3>{ cookbookTitle}</h3>
</div>

<div>

</div>
</div>
</article>
);
}

const mapStateToProps = state => ({
    
    cookbook: state.cookbook,
    recipe: state.recipe,
    
  });

export default withRouter(
connect(
mapStateToProps,
{loadCookbookRecipes }
)(CookbookCard)
);