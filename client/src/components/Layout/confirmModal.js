import React from 'react'
import './confirmModal.css'

function ConfirmModal(props) {

    const {closeAction, confirmAction} = props
    return (
        <div className='confirmModal'>
            {/* <h1>this is the confirmModal</h1> */}

            <h1>rename</h1>
            <button onClick={confirmAction}>Confirm</button>
            <button onClick={closeAction}>CLose</button>
            
        </div>
    )
}



export default ConfirmModal

