const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: { type: String, unique: true, required: true},
  password:  { type: String },
  messages: [{ type: String }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;