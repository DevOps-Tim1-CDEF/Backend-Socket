const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  nama: { type: String, required: true },
  profile: { type: String },
  email: { type: String, required: true, unique: true },
  active: { type: Number, default: 1 },
});

module.exports = mongoose.model("User", userSchema, "user");
