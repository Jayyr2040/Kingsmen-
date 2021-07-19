const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: { type: String, unique: true, required: true },
  password: String,
  message: [String]
});

const User = mongoose.model("User", userSchema);

module.exports = User;