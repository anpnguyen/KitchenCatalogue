import React from "react";
import TextareaAutosize from "react-textarea-autosize";

function recipeInstructions(props) {
  const {
    newRecipeStage,
    handleToBack,
    setRecipeInstructions,
    recipeInstructions,
    handleSubmit
  } = props;

  const handleInstructionChange = (e, index) => {
    const valuesInstructions = [...recipeInstructions];

    valuesInstructions[index] = e.target.value;
    setRecipeInstructions(valuesInstructions);
  };

  const handleInstructionAdd = e => {
    e.preventDefault();
    const valuesInstructions = [...recipeInstructions];
    valuesInstructions.push(" ");

    setRecipeInstructions(valuesInstructions);
  };

  const handleInstructionRemove = (index, e) => {
    e.preventDefault();
    const valuesInstructions = [...recipeInstructions];

    valuesInstructions.splice(index, 1);
    setRecipeInstructions(valuesInstructions);
  };

  const handleSubmitButtonClick = e => {
    handleSubmit(e);
  };

  return (
    <>
      {newRecipeStage === 3 && (
        <div className="instructionsContainer ">
          <section className="instructions">
            <div className="instructionsItem ">
              <h3>Instructions</h3>
            </div>
            {recipeInstructions.map((recipeInstruction, i) => {
              return (
                <div className="instructionsItem" key={`${i} + instruction`}>
                  <div className="instructionsItemLeft">
                    <label htmlFor={`${i}instruction`}>
                      <h3>{i + 1}.</h3>
                    </label>
                  </div>
                  <div className="instructionsItemRight">
                    <TextareaAutosize
                      useCacheForDOMMeasurements
                      name={`${i}instruction`}
                      value={recipeInstruction}
                      onChange={e => handleInstructionChange(e, i)}
                    />

                    <button
                      className="blueButton"
                      onClick={e => handleInstructionRemove(i, e)}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="instructionsItem addInstructionButton">
              <button className="" onClick={e => handleInstructionAdd(e)}>
                Add Instruction
              </button>
            </div>
          </section>

          <nav className="instructionsItem instructionsNavButton">
            <button className="blueButton" onClick={e => handleToBack(e)}>
              Back{" "}
            </button>
            <button
              className="blueButton"
              onClick={e => handleSubmitButtonClick(e)}
            >
              Submit
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

export default recipeInstructions;
