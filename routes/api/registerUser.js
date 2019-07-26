const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const nodemailer = require("nodemailer");
const User = require("../../models/User");

// transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// *** Register a new user ***
router.post(
  "/",
  [
    check("username", "A username is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    console.log(req.body);

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg:
                "A user with that email has already been registered - please use a different email"
            }
          ]
        });
      }
      user = new User({
        username,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // user has been saved

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.REGISTER_SECRET,

        { expiresIn: 3600 },
        (err, registerToken) => {
          if (err) throw err;

          const url = `http://localhost:3000/confirm/${registerToken}`;

          transporter.sendMail({
            to: user.email,
            subject: "Please Confirm Email - Kitchen Catalogue",
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
          });
          res.json({
            msg: "A confirmation email has been sent to your email address"
          });
          console.log("register email sent");
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

router.get("/:emailToken", async (req, res) => {
  try {
    const decoded = jwt.verify(
      req.params.emailToken,
      process.env.REGISTER_SECRET
    );
    console.log(decoded);

    const confirmedUser = await User.findOneAndUpdate(
      { _id: decoded.user.id },
      { confirmed: true },
      { new: true }
    );
    res.json({ msg: "Your account has been verified" });
  } catch (e) {
    console.log(e);
    res.send("error");
  }
});

router.post("/resendConfirmation", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email: email });

    console.log(user);

    if (!user) {
      console.log("this called");
      return res.status(400).json({
        msg: "This email does not exist - please register first"
      });
    }
    if (user && user.confirmed) {
      console.log("1");
      return res
        .status(400)
        .json({ msg: "This email address has already been registered" });
    } else {
      console.log(user)
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.REGISTER_SECRET,

        { expiresIn: 3600 },
        (err, registerToken) => {
          if (err) throw err;

          const url = `http://localhost:3000/confirm/${registerToken}`;

          transporter.sendMail({
            to: user.email,
            subject: "Please Confirm Email - Kitchen Catalogue -resent",
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`
          });
          res.json({
            msg: "A confirmation email has been sent to your email address"
          });
          console.log("register email sent");
        }
      );

      res.json({
        msg: "A confirmation email has been sent to your email address"
      });
    }
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});

module.exports = router;
