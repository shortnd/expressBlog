const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");


exports.index = async (req, res) => {
  const comments = await Comment.find({});
  res.json(comments);
};

exports.store = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  const comment = new Comment(req.body);
  comment.post = post._id;
  post.comments.push(comment._id);
  await Promise.all([comment.save(), post.save()]);
  res.redirect("back");
};
