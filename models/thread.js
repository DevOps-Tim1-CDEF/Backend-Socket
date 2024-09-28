const mongoose = require("mongoose");

const threadSchema = mongoose.Schema({
  // postId = ID post
  // parentId = ID dari parent
  // kalau cuma satu layer comment, then postId atau parentId bisa dihapus karena pada child ke-1, postId akan selalu sama dgn parentId (tapi need to change code controller dikit kalo mau hapus)
  postId: { type: mongoose.Schema.Types.ObjectId, default: null },
  parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
  depth: { type: Number, default: 1 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  contents: { type: String, required: true },
  snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Snippet'}],
  status: { type: Number, default: 1 },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Thread", threadSchema, "thread");
