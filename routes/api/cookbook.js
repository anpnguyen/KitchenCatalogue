const express = require('express');
const router = express.Router();
const Cookbook = require('../../models/Cookbook');
const authMiddleware = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator/check');


// *** Create a new cookbook ***  
router.post('/',
    [
        authMiddleware,
        [
        check('cookbookTitle', 'A title for your cookbook is required')
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
                cookbookTitle,
                cookbookImage,
                savedRecipes
                              
        } = req.body;

        const cookbookFields = {};
        cookbookFields.user = req.user.id;
        if (cookbookTitle) cookbookFields.cookbookTitle = cookbookTitle;
        if (cookbookImage) cookbookFields.cookbookImage = cookbookImage;
        if (savedRecipes) cookbookFields.savedRecipes = savedRecipes;         

        try {
            cookbook = new Cookbook(cookbookFields);
            await cookbook.save();
            res.json(cookbook);
            } catch (err) {
                console.log(typeof(err.code))
                console.error(err.message);
                if(err.code === 11000){
                    res.json({error: "please choose a unique name"})
                }else{
                res.status(500).send('Server Error - cannot create a new cookbook');
                }
        };
    }
);

// *** get all cookbooks *** working
router.get('/', authMiddleware, async (req, res) => {
    try {
        console.log(req.user.id)
        const cookbooks = await Cookbook.find({user:req.user.id});
        res.json(cookbooks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot fetch user cookbooks');
    }
});

 // ** get an individual cookbook *** working
router.get('/:cookbook_id', authMiddleware, async (req, res) => {
    try {
        // console.log(req.params.cookbook_id)
        const cookbook = await Cookbook.findOne({
            _id: req.params.cookbook_id
        }).populate('savedRecipes',['title', 'imageUrl'] );

        if (!cookbook) {
            return res.status(400).json({ msg: 'cookbook not found - from try' });
        }             
        if(cookbook.user.equals(req.user.id)){
            
            res.json(cookbook)
            }
    
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'cookbok not found - from catch' });
        }
        res.status(500).send('Server Error');
    }
});

router.put('/:cookbook_id',
    [
        authMiddleware,
        [
        check('cookbookTitle', 'A title for your cookbook is required')
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
                cookbookTitle,
                cookbookImage,
                savedRecipes
                              
        } = req.body;

        const cookbookFields = {};
        cookbookFields.user = req.user.id;
        if (cookbookTitle) cookbookFields.cookbookTitle = cookbookTitle;
        if (cookbookImage) cookbookFields.cookbookImage = cookbookImage;
        if (savedRecipes) cookbookFields.savedRecipes = savedRecipes;         

        try {
            cookbook = new Cookbook(cookbookFields);
            await cookbook.save();
            res.json(cookbook);
            } catch (err) {
                console.log(typeof(err.code))
                console.error(err.message);
                if(err.code === 11000){
                    res.json({error: "please choose a unique name"})
                }else{
                res.status(500).send('Server Error - cannot create a new cookbook');
                }
        };
    }
);

//  **** delete a cook book *** working

router.delete('/:cookbook_id', authMiddleware, async (req, res) => {
    try {   
    
        await Recipe.deleteOne({ _id: req.params.cookbook_id });
        res.json({ msg: 'Recipe  deleted' });       

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error - cannot delete recipe');
    }
});



module.exports = router;


