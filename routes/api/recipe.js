const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator/check');
const Recipe = require('../../models/Recipe');


// *** Create a new recipe *** working
router.post('/',
    [
        authMiddleware,
        [
        check('title', 'A title is required')
            .not()
            .isEmpty()
        ]
    ],
  
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
                title,
                imageUrl,
                url,
                servings,
                time,
                keywords,
                ingredients,
                instructions
                
        } = req.body;

        const recipeFields = {};
        recipeFields.user = req.user.id;
        if (title) recipeFields.title = title;
        if (imageUrl) recipeFields.imageUrl = imageUrl;
        if (url) recipeFields.url = url;
        if (servings) recipeFields.servings = servings;
        if (time) recipeFields.time = time;
        if (keywords) recipeFields.keywords = keywords;
        if (ingredients) recipeFields.ingredients = ingredients;
        if (instructions) recipeFields.instructions = instructions;
        


        try {
        recipe = new Recipe(recipeFields);
        await recipe.save();
        res.json(recipe);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error - cannot create a new recipe');
        };
    }
);

//  *** get all users recipes *** working
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log(req.user.id)
        // console.log('called')
        const recipes = await Recipe.find({user:req.user.id});
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot fetch user recipes');
    }
});


// *** get individual recipe *** working
router.get('/:recipe_id', authMiddleware, async (req, res) => {
    try {
        console.log(req.params.recipe_id)
        const recipe = await Recipe.findOne({
            _id: req.params.recipe_id
        }).populate('user', ['id', 'username']);
        if (!recipe) {
            return res.status(400).json({ msg: 'recipe not found - from try' });
        }
        if (recipe.user.id !== req.user.id) {
            return res.status(400).json({ msg: 'You are not authorised to access this recipe' });
        }

        res.json(recipe);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Recipe not found - from catch' });
        }
        res.status(500).send('Server Error');
    }
});

// *** Edit a recipe *** working
router.put('/:recipe_id',
    [
        authMiddleware,
        [
        check('title', 'A title is required')
            .not()
            .isEmpty()
        ]
    ],
  
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
                title,
                imageUrl,
                url,
                servings,
                time,
                keywords,
                ingredients,
                instructions
                
        } = req.body;

        const recipeFields = {};
        if (title) recipeFields.title = title;
        if (imageUrl) recipeFields.imageUrl = imageUrl;
        if (url) recipeFields.url = url;
        if (servings) recipeFields.servings = servings;
        if (time) recipeFields.time = time;
        if (keywords) recipeFields.keywords = keywords;
        if (ingredients) recipeFields.ingredients = ingredients;
        if (instructions) recipeFields.instructions = instructions;
        


        try {         
            await Recipe.findOneAndUpdate({_id: req.params.recipe_id}, recipeFields );
            res.json({ msg: 'recipe updated' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error - cannot create a new recipe');
        };
    }
);


//  *** Delete Route - working ** 

router.delete('/:recipe_id', authMiddleware, async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.recipe_id });
        res.json({ msg: 'Recipe  deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot delete recipe');
    }
});
module.exports = router;