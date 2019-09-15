import React, { Fragment } from "react";

function ViewRecipeIngredients(props) {
  const { ingredients } = props;

  return (
    <>
      <section className="ingredients ">
        <ul className="">
          <li className=" ">
            <h3>Ingredients</h3>{" "}
          </li>
          {ingredients.map((ingredient, index) => (
            <Fragment key={ingredient + index}>
            
              <li>{ingredient}</li>
            </Fragment>
          ))}
        </ul>
      </section>
    </>
  );
}

export default ViewRecipeIngredients;
