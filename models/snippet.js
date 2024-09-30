const mongoose = require("mongoose");

const snippetSchema = mongoose.Schema({
  filename: { type: String },
  type: { type: String },
  code: { type: String }
});

module.exports = mongoose.model("Snippet", snippetSchema, "snippet");
