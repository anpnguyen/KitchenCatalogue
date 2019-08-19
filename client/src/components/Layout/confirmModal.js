import React, {useEffect} from "react";
import "./confirmModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ConfirmModal = React.forwardRef((props, ref) => {
  const { closeAction, confirmAction, title, text, confirmationText, isShowing} = props;
  

  useEffect(()=>{
    if(isShowing){
      document.body.style.overflow = "hidden"
    } else{
      document.body.style.overflow = ""
    }
  },[isShowing])
 

  
   return (
    <>
      <div className={`confirmModal ${isShowing? " confirmModalShowing": ""}`} ref={ref}>
        <div className="confirmModalTitle">
          <h2>{title}</h2>
        </div>
        <p>{text}</p>
        {props.children}
        <span onClick={closeAction}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <div>
          <button onClick={confirmAction} className="blueButton confirmButton">
            {confirmationText}
          </button>
          <button onClick={closeAction} className="confirmButton">
            Cancel
          </button>
        </div>
      </div>

      <div className={`confirmOverlay ${isShowing? " confirmModalShowing": ""}`} />
    </>
  );
});

export default ConfirmModal;
