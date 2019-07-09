import React from "react";

function receipeDetails(props) {
  const {
    title,
    servings,
    time,
    imageUrl,
    newRecipeStage,
    handleToNext,
    setRecipeDetails,
    recipeDetails
  } = props;

  const handleDetailChange = e => {
    setRecipeDetails({ ...recipeDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      {newRecipeStage === 1 && (
        <div className="recipeDetailsContainer">
          <section className="recipeDetails">
            <div className="recipeDetailsItem text-center">
              <h3>Recipe Details</h3>
            </div>
            <div className="recipeDetailsItem ">
              <div>
                <label htmlFor="Title">
                  <h5>Title:</h5>{" "}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleDetailChange}
                />
              </div>
            </div>
            <div className="recipeDetailsItem">
              <div>
                <label htmlFor="ImageUrl">
                  <h5>Image Url:</h5>{" "}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Image Url"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={handleDetailChange}
                />
              </div>
            </div>
            <div className="recipeDetailsItem">
              <div>
                <label htmlFor="servings">
                  <h5>Servings:</h5>{" "}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Servings"
                  name="servings"
                  value={servings}
                  onChange={handleDetailChange}
                />
              </div>
            </div>
            <div className="recipeDetailsItem">
              <div>
                <label htmlFor="time">
                  <h5>Cooking Time:</h5>{" "}
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Cooking Time"
                  name="time"
                  value={time}
                  onChange={handleDetailChange}
                />
              </div>
            </div>
            <nav className="recipeDetailsItem">
              <button onClick={handleToNext} className="blueButton">
                Next
              </button>
            </nav>
          </section>
        </div>
      )}
    </>
  );
}

export default receipeDetails;
