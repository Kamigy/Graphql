const mongoose = require('mongoose');
const Post = require('./Post');

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.SchemaTypes.ObjectId,
    schema: Post
  }
},
{
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
  
module.exports = {Comment};