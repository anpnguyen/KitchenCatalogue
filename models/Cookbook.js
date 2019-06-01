const mongoose = require('mongoose');

const CookbookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    cookbookTitle:{
        type: String,
        required: true,
        unique: true
    },

    cookbookImage:{
        type: String
    },

    savedRecipes:[{
        recipe:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipe'
        }

    }]
})

Cookbook = mongoose.model('cookbook', CookbookSchema);

module.exports = Cookbook