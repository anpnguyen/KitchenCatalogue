const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  favouriteRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipe",
      unique: true
    }
  ]
});

User = mongoose.model("user", UserSchema);

module.exports = User;


