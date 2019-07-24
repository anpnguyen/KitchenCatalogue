const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authMiddleware = require("../../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
// const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

// *** Check if authentication of the user - from header of request***
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error - User cannot be found");
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Invalid Credentials - please try again" }]
          });
      }

      if (!user.confirmed) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Please validate your account first" }]
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({
            errors: [{ msg: "Invalid Credentials - please try again" }]
          });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,

        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
