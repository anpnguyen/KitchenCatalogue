const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    headers:{

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
        keywords:[String]

    },
       
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
    } ],

    instructions: [String]
    
  }
);

Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe