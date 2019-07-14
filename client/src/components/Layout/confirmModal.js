import React from 'react'
import './confirmModal.css'

const ConfirmModal = props => {

    

    const {closeAction, confirmAction} = props
    return (
        <div className='confirmModal'>
            {/* <h1>this is the confirmModal</h1> */}
            {props.children}
            
            <button onClick={confirmAction}>Confirm</button>
            <button onClick={closeAction}>CLose</button>
            
        </div>
    )
}



export default ConfirmModal

