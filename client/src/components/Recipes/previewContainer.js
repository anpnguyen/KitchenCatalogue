import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils } from "@fortawesome/free-solid-svg-icons";

function previewContainer(props) {
  const { user, title, servings, time, imageUrl, newRecipeStage } = props;
  return (
    <>
      {newRecipeStage === 1 && (
        <div className="previewContainer">
          <section className="preview">
            {user !== null && (
              <>
                <div className="previewItem">
                  <h1 className="">{!title ? "My Recipe Title" : title}</h1>
                </div>

                <div className="previewItem">
                  <p>
                    <span className="bold">By: </span> {user.username}{" "}
                  </p>
                </div>
                <div className="previewItem lastP">
                  <p>
                    <span className="spanMargin">
                      <span className="bold">
                        <FontAwesomeIcon icon={faUtensils} /> Serves:
                      </span>{" "}
                      {servings}
                    </span>
                    <span className="bold">
                      <FontAwesomeIcon icon={faClock} />
                      Cooking Time:
                    </span>{" "}
                    {time}
                  </p>
                </div>
                <div className="previewItem">
                  {!imageUrl ? (
                    <div className="fillerImg" />
                  ) : (
                    <img className="image" src={imageUrl} alt={title} />
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default previewContainer;
