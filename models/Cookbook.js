const mongoose = require('mongoose');
// const Recipe = require('')
// const RecipeObjectId = mongoose.Schema.Types.ObjectId

const CookbookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    cookbookTitle:{
        type: String,
        required: true
        
    },

    cookbookImage:{
        type: String
    },
    savedRecipes: [
        
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipe'
        }
    ]
})



Cookbook = mongoose.model('cookbook', CookbookSchema);

module.exports = Cookbook
