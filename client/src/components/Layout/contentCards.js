import React from 'react'
import RecipeCard from './recipeCard'
import CreateNewRecipeCard from './createNewRecipeCard'

function ContentCards(props) {
    
    
    const {data,navigation, totalPages, pageLimit} = props
    console.log(data)
    
    const mappedData = data.map(recipe => {
        return( <RecipeCard

            recipe={recipe}
            key={recipe._id}
            // title={recipe.title}
            // imageUrl={recipe.imageUrl}
            // _id={recipe._id}
            // servings={recipe.servings}
            // time={recipe.time}

        />  )
    })

    return (
        <div className="contentBoxCard">
            {mappedData}
            <CreateNewRecipeCard/>
        </div>
    )
}


export default ContentCards

