import React , {memo}from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUtensils } from "@fortawesome/free-solid-svg-icons";


function PreviewText(props) {
  const { servings, time } = props;

  return (
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
  );
}

export default memo(PreviewText);
