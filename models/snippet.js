const mongoose = require("mongoose");

const snippetSchema = mongoose.Schema({
  filename: { type: String, required: true },
  type: { type: String, required: true },
  code: { type: String, required: true }
});

module.exports = mongoose.model("Snippet", snippetSchema, "snippet");
