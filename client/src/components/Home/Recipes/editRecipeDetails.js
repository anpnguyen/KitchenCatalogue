import React from 'react'

function EditRecipeDetails(){
    return(
        <div className="newRecipeDetailsContainer">
            <div className="newRecipeDetails">
                <div className='newRecipeItem text-center'>
                    <h3>Recipe Details</h3>
                    
                </div>
                <div className='newRecipeItem text-center'>
                    <div><label htmlFor="Title"><h5>Title:</h5> </label></div>
                    <div><input type="text" placeholder="Title" name="title" value={title} onChange={handleDetailChange} /></div>
                </div>
                <div className='newRecipeItem'>
                    <div><label htmlFor="ImageUrl"><h5>Image Url:</h5> </label></div>
                    <div><input type="text" placeholder="Image Url" name = "imageUrl" value={imageUrl} onChange={handleDetailChange}/></div>
                </div>
                <div className='newRecipeItem'>
                    <div><label htmlFor="ImageUrl"><h5>Servings:</h5> </label></div>
                    <div><input type="text" placeholder="Servings" name ="servings" value={servings} onChange={handleDetailChange}/></div>
                </div>
                <div className='newRecipeItem'>
                    <div><label htmlFor="ImageUrl"><h5>Cooking Time:</h5> </label></div>
                    <div><input type="text" placeholder="Cooking Time" name="time" value={time} onChange={handleDetailChange}/></div>
                </div>
            </div>
        </div>
    )
}

export default EditRecipeDetails