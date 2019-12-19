const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.index = async (req, res) => {
  const posts = await Post.find();
  res.render("posts/index", {
    title: "All Posts",
    posts
  });
};

exports.create = (req, res) => {
  res.render("posts/create", {
    title: "Create Post"
  });
};

exports.store = async (req, res) => {
  const post = await new Post(req.body).save();
  res.redirect("/posts");
};

async function findPostBySlug(slug) { return await Post.findOne({ slug }) };

exports.show = async (req, res) => {
  const post = await findPostBySlug(req.params.slug);
  res.render("posts/show", {
    title: `${post.title}`,
    post
  })
};

exports.edit = async (req, res) => {
  const post = await findPostBySlug(req.params.slug);
  res.render("posts/edit", {
    title: `${post.title}`,
    post
  });
};

exports.update = async (req, res) => {
  const post = await Post.findOneAndUpdate({
    slug: req.params.slug
  }, req.body, {
    new: true,
    runValidators: true,
  }).exec();
  res.redirect(`/posts/${post.slug}`);
};

exports.delete = async (req, res) => {
  const post = await findPostBySlug(req.params.slug);
  await post.remove();
  res.redirect("/posts");
};

exports.searchPosts = async (req, res) => {
  const posts = await Post.find({
    title: {
      $regex: `.*${req.query.q}.*`,
      $options: 'i'
    },
  });
  res.render("posts/_postsTable", {
    posts
  });
};
