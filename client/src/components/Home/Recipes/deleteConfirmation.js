import React , {useEffect, useRef}from 'react'
import './individualRecipe.css'


function DeleteConfirmation(props){
    const node = useRef(this)
    const { handleStateChange, handleDeleteConfirmation, isDelete} = props
    

    useEffect(() => {
        
        if (isDelete) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    function handleOnClickNo(){
        handleStateChange(false)
    }

    function handleOnClickDelete(){
        handleDeleteConfirmation()
    }
    
    const handleClickOutside = e => {
        
        
        
        if (node.current.contains(e.target)) {
        
          return;
        }
        
        handleOnClickNo();
      };

     
    

    

      
    return(
        <div className='isDelete' ref={node}>
        <div>
            <h2>Are you sure you want to delete this item?</h2>
        </div>
        <div>
            <button className='blueButton' onClick={handleOnClickDelete}>Yes</button>
            <button className='blueButton' onClick={handleOnClickNo}>No</button>
        </div>
    </div>
    )
}

export default DeleteConfirmation