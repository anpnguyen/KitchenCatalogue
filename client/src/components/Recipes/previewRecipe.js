import React from 'react'

function PreviewRecipe(){
    return(
        <div className="newRecipePreviewContainer">
            <div className='newRecipePreview'>
                {user!== null &&
                    <div className="individualRecipeDetails ">
                        <div className=''>
                            <h1 className="">{!title?"Title:" :title }</h1>
                            <p><span className='bold'>By: </span> {user.username} </p>
                            <p><span className="spanMargin"><span className='bold'><FontAwesomeIcon icon={faUtensils} /> Serves </span> {servings}</span>  <span className='bold'><FontAwesomeIcon icon={faClock} />Cooking Time:</span> {time}</p>      
                            <div className="text-center individualRecipeImageContainer ">
                            {!imageUrl ? <div className="fillerImg"></div>: <img className='image' src={imageUrl} alt=""/>}
                            
                            </div>
                            </div>
                    
                    </div> 
                }
            </div> 
        </div> 
    )
}

export default PreviewRecipe