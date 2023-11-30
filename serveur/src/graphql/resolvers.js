const { Post } = require("../models/Post.js");
const { Comment } = require("../models/Comment.js");

const resolvers = {
  Query: {
    posts: async (parent, args) => {
      const {order} = args;
      return await Post.find().sort({createdAt: order});
    },
    post: async (parent, args) => {
        const {id} = args;
        return await Post.findById(id);
    },
    commentsByPostId: async (parent, args) => {
      const {postId} = args;
      return await Comment.find({ postId: postId });
    },
  },
  Mutation: {
    createPost: async (parent, args) => {
      const { author, title, link } = args;
      const post = new Post({ author, title, link });
      await post.save();
      return post;
    },
    deletePost: async (parent, args) => {
      const { id } = args;
      return await Post.findByIdAndDelete(id);
    },
    createComment: async (parent, args) => {
      const { author, content, postId } = args;
      const comment = new Comment({ author, content, postId });
      await comment.save();
      return comment;
    },
  },
};

module.exports = { resolvers };
