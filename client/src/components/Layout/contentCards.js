import React from 'react'
import RecipeCard from './recipeCard'

function ContentCards(props) {
    
    
    const {data,navigation, totalPages, pageLimit} = props
    console.log(data)
    
    const mappedData = data.map(recipe => {
        return( <RecipeCard

            recipe={recipe}
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
        </div>
    )
}


export default ContentCards

