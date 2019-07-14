import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./contentCard.css";


function CardSettingsIcon(props) {

    const {removeFromCookbook} = props

    

    return (
        <div className='removeFromCookbook' >
            <FontAwesomeIcon icon={faCog} /> 
          </div>
    )
}


export default CardSettingsIcon

