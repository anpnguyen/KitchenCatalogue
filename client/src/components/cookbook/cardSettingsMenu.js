import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faTimes,
  faPencilAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
// import "../Layout/contentCard.css";

const CardSettingsMenu = React.forwardRef((props, ref) => {
  const { onClick, id, isShowing, isOpacity } = props;
  return (
    <>
      <div
        className={`removeFromCookbook ${isShowing ? "invertColor" : ""} ${isOpacity? '':"lowOpacity"}`}
        onClick={onClick}
        id={id}
        ref={ref}
      >
        {isShowing ? (
          <>
            {" "}
            {props.children} <FontAwesomeIcon icon={faTimes} />{" "}
          </>
        ) : (
          <FontAwesomeIcon icon={faCog} />
        )}
      </div>

      <div className={`settingsMenu ${isShowing ? "settingsMenuActive" : ""}`}>
        {/* {props.children} */}
      </div>
    </>
  );
});

export default CardSettingsMenu;
