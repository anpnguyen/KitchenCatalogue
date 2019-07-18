const express = require("express");
const router = express.Router();
const Cookbook = require("../../models/Cookbook");
const authMiddleware = require("../../middleware/authMiddleware");
const { check, validationResult } = require("express-validator/check");

// *** Create a new cookbook ***
router.post(
  "/",
  [
    authMiddleware,
    [
      check("cookbookTitle", "A title for your cookbook is required")
        .not()
        .isEmpty()
    ]
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cookbookTitle, cookbookImage, savedRecipes } = req.body;

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
      if (err.code === 11000) {
        res.json({ error: "please choose a unique name" });
      } else {
        res.status(500).send("Server Error - cannot create a new cookbook");
      }
    }
  }
);

// *** get all cookbooks *** working
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cookbooks = await Cookbook.find({ user: req.user.id }).populate("savedRecipes", ["imageUrl"]);
    res.json(cookbooks);
  } catch (err) {
    res.status(500).send("Server Error - cannot fetch user cookbooks");
  }
});

// ** get an individual cookbook *** working
router.get("/:cookbook_id", authMiddleware, async (req, res) => {
  try {
    const cookbook = await Cookbook.findOne({
      _id: req.params.cookbook_id
    }).populate("savedRecipes");

    if (!cookbook) {
      return res.status(400).json({ msg: "cookbook not found - from try" });
    }
    if (cookbook.user.equals(req.user.id)) {
      res.json(cookbook);
    }
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "cookbok not found - from catch" });
    }
    res.status(500).send("Server Error");
  }
});

// Edit a Cookbook -

router.put("/:cookbook_id", authMiddleware, async (req, res) => {
  const { cookbookId, recipeId, newCookbookTitle } = req.body;

  try {
    // this will a remove a recipe from a cookbook
    if (!newCookbookTitle) {
      let cookbook = await Cookbook.findOneAndUpdate(
        { _id: cookbookId },
        { $pull: { savedRecipes: recipeId } }
      );

      res.json({ recipeDeleted: recipeId });
    }
    //  this will rename a cookbook
    else {
      let cookbookUpdated = await Cookbook.findOneAndUpdate(
        { _id: cookbookId },
        { cookbookTitle: newCookbookTitle },
        { new: true }
      );

      res.json(cookbookUpdated);
    }
  } catch (err) {
    res.status(500).send("Server Error - cannot remove recipe from cookbook");
  }
});

//  **** delete a cook book *** working

router.delete("/:cookbook_id", authMiddleware, async (req, res) => {
  try {
    await Cookbook.deleteOne({ _id: req.params.cookbook_id });
    res.json({ deletedCookbookId: req.params.cookbook_id });
  } catch (err) {
    res.status(500).send("Server Error - cannot delete recipe");
  }
});

// this will update multiple cookbooks
router.put("/", authMiddleware, async (req, res) => {
  const { cookbookId, recipeId } = req.body;


  try {
    cookbook = await Cookbook.findOneAndUpdate(
      { _id:  cookbookId  },
      { $push: { savedRecipes: recipeId } }
      
    );
    
    res.json({ msg: "Successfully added to cookbook" });
  } catch (err) {
    if (err.code === 11000) {
      res.json({ error: "please choose a unique name" });
    } else {
      res.status(500).send("Server Error - cannot update cookbook");
    }
  }
});

// this fire when a recipe gets delete, it will remove this entry from all coook books

router.put("/deleteRecipe/deleteRecipe", authMiddleware, async (req, res) => {
  const { recipeToDelete } = req.body;

  try {
    cookbook = await Cookbook.updateMany({
      $pull: { savedRecipes: { $in: recipeToDelete } }
    });

    res.json({ msg: "Successfully added to cookbook" });
  } catch (err) {
    if (err.code === 11000) {
      res.json({ error: "please choose a unique name" });
    } else {
      res.status(500).send("Server Error - cannot update cookbook");
    }
  }
});

module.exports = router;
