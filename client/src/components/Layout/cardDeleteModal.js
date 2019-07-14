import React from 'react'


function CardDeleteModal(props) {

    const {setDeleteRecipeModal, removeFromCookbook, ref} = props
    return (
        <div className='cardDeleteModal'>
            Are you sure you want to remove this recipe?
            <button onClick={removeFromCookbook}>Yes</button>
            <button onClick={()=> setDeleteRecipeModal(false)}>No</button>
        </div>
    )
}



export default CardDeleteModal

