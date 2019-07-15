import React from 'react'
import './confirmModal.css'

const ConfirmModal = React.forwardRef((props,ref)=>{

    

    const {closeAction, confirmAction, id} = props
    return (
        <div className='confirmModal'  ref={ref}>
            {/* <h1>this is the confirmModal</h1> */}
            {props.children}
            
            <button onClick={confirmAction}>Confirm</button>
            <button onClick={closeAction}>CLose</button>
            
        </div>
    )
}
)



export default ConfirmModal

