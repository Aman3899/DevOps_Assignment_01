var mongoose = require("mongoose");

mongoose.connect("mongodb://db:27017/Blog-App");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  isAdmin:{
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;