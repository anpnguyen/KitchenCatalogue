const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator/check');
const Recipe = require('../../models/Recipe');
const User = require('../../models/User');


// *** Create a new recipe *** working
router.post('/',[
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
                console.error(err);
                                     
                    res.status(500).json({ errors: [{ msg: 'A recipe with that title has already been registered - please use a different title' }] });
z             };
    }
);

//  *** get all users recipes *** working
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log(req.user.id)
        const recipes = await Recipe.find({user:req.user.id});
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot fetch user recipes');
    }
});

//  *** get a number to  ***   UNUSED
router.get('/set/:setNumber', authMiddleware, async (req, res) => {
    try {
        // console.log(req.params.setNumber)
        let num = parseInt(req.params.setNumber)
        const recipes = await Recipe.find({user:req.user.id}).limit(num);
        res.json(recipes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot fetch user recipes');
    }
});

// *** get individual recipe *** working
router.get('/:recipe_id', authMiddleware, async (req, res) => {
    try {
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


// *** Edit a recipe *** workaroudn with post

router.post('/:recipe_id/edit',[
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
  )


// Delete POst work around
router.post('/:recipe_id/delete', authMiddleware, async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.recipe_id });
        res.json({ msg: 'Recipe  deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot delete recipe');
    }
});


//  *** Delete Route - unused **  NEED TO CHANGE

router.delete('/:recipe_id', authMiddleware, async (req, res) => {
    try {
        await Recipe.deleteOne({ _id: req.params.recipe_id });
        res.json({ msg: 'Recipe  deleted' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot delete recipe');
    }
});




// Get recipe favourites

router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - User cannot be found');
    }
  });


router.get('/favourite', authMiddleware     , async (req, res) => {
       
        try {         
            const favRecipes = await User.findbyId(req.user.id).select('-password').populate('favouriteRecipes');                      

            res.json(favRecipes.favouriteRecipes);
            console.log('get all recipes')
            // res.json({ msg: 'recipe added to favourites' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error - cannot add to favourite');
        };




    }
)
// add recupe to favourite


router.put('/favourite',
    [
        authMiddleware
    ],
  
    async (req, res) => {
        const {recipeId} = req.body;

        try {         


            let newFavRecipe = await User.findOne({ favouriteRecipes: recipeId });

        if (newFavRecipe) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'This has already been favourited - please use a different email' }] });
        }

    

            let favouritedRecipes = await User.findOneAndUpdate({_id: req.user.id},  { $push: { favouriteRecipes: recipeId } } ).populate('favouriteRecipes',['title']);

            // const cookbook = await Cookbook.findOne({
            //     _id: req.params.cookbook_id
            // }).populate('savedRecipes',['title', 'imageUrl'] );


            // let favouritedRecipes = await User.findOne({_id:})

            res.json(favouritedRecipes.favouriteRecipes);
            console.log('added')
            // res.json({ msg: 'recipe added to favourites' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error - cannot add to favourite');
        };
    }
);


module.exports = router;