import React, {Fragment} from "react";
import uuid from 'uuid/v4'

function ViewRecipeInstructions(props) {
    const {instructions} = props
  return (
    <>
      <section className="instructions ">
        <ul className="individualRecipeInstructions">
          <li className="individualRecipeList bold color">
            <h3>Instructions</h3>{" "}
          </li>

          {instructions.map((instruction, index) => (
            <Fragment key={uuid()}>
              <li className="individualRecipeListInstructions">
                <div className="number">
                  <span className="bold">{index + 1}. </span>
                </div>
                <div>{instruction}</div>
              </li>
              <hr className="width80" />
            </Fragment>
          ))}
        </ul>
      </section>
    </>
  );
}

export default ViewRecipeInstructions;
