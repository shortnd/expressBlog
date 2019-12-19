const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const Comment = require("./Comment");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  body: {
    type: String
  },
  slug: {
    type: String,
    unique: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

PostSchema.pre("save", async function(next) {
  if (!this.isModified("title")) {
    next();
    return;
  }
  this.slug = slug(this.title, {
    lower: true
  });
  slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const postsWithSlug = await this.constructor.find({ slug: slugRegex });
  if (postsWithSlug.length) {
    this.slug = `${this.slug}-${postsWithSlug.length + 1}`
  }
  next();
});

function autopopulate(next) {
  this.populate("comments");
  next();
}
PostSchema.pre('find', autopopulate);
PostSchema.pre('findOne', autopopulate);

PostSchema.pre('remove', async function(next) {
  await Comment.remove({ post: this._id }).exec();
  next()
});

module.exports = mongoose.model('Post', PostSchema);
