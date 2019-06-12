const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const Cookbook = require('../../models/Cookbook')

// *** Register a new user ***
router.post('/',
    [
        check('username', 'A username is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Please enter a password with 8 or more characters')
            .isLength({ min: 8 })
    ],
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'A user with that email has already been registered - please use a different email' }] });
        }
        user = new User({
            username,
            email,
            password
        });

         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);

        await user.save();

        // const cookbook = new Cookbook({
        //     user: user.id,
        //     cookbookTitle: "My Favourites"
        // })

        // await cookbook.save()

        // console.log('after cookbook saved')

        const payload = {
            user: {
            id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
            }
        );
        } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server error');
        }
    }
);
module.exports = router;