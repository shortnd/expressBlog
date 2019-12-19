const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: 'Body is required'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = mongoose.model("Comment", commentSchema);
