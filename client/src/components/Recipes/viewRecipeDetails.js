import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils } from "@fortawesome/free-solid-svg-icons";

function ViewRecipeDetails(props) {
    const {servings, user, time} = props
    return (
        <>
        <section className="recipeDetails ">
              <div className="">
                <p>
                  <span className="bold">By: </span> {user.username}{" "}
                </p>
                <p>
                  <span className="spanMargin">
                    <span className="bold">
                      <FontAwesomeIcon icon={faUtensils} /> Serves{" "}
                    </span>{" "}
                    {servings}
                  </span>{" "}
                  <span className="bold">
                    <FontAwesomeIcon icon={faClock} />
                    Cooking Time:
                  </span>{" "}
                  {time}
                </p>
              </div>
            </section>
        </>
    )
}



export default ViewRecipeDetails

