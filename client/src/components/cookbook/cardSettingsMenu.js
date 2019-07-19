import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faTimes  
} from "@fortawesome/free-solid-svg-icons";

const CardSettingsMenu = React.forwardRef((props, ref) => {
  const { onClick, id, isShowing, isOpacity } = props;
  return (
    <>
      <div
        className={`removeFromCookbook ${isShowing ? "invertColor" : ""} ${
          isOpacity ? "" : "lowOpacity"
        }`}
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

      <div
        className={`settingsMenu ${isShowing ? "settingsMenuActive" : ""}`}
      />
    </>
  );
});

export default CardSettingsMenu;
