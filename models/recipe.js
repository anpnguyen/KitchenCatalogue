const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    url: {
        type: String
    },
    servings:{
        type: String
    },
    time:{
        type: String
    },    
    keywords:[String],
    instructions: [String],            
    ingredients: [{
        quantity:{
            type: String
        },
        unit:{
            type:String
        },
        ingredientName: {
            type : String
        }
    }],

  }
);

Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe