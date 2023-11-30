const gql = require("graphql-tag");

const typeDefs = gql`
scalar Date

  type Query {
    posts(order: String!): [Post]
    post(id: ID!): Post
    commentsByPostId(postId: ID!): [Comment]
  }

  type Post {
    _id: ID!
    author: String!
    title: String!
    link: String!
    createdAt: Date
    updatedAt: Date
  }

  type Comment {
    _id: ID!
    author: String!
    content: String!
    postId: ID!
    createdAt: Date
    updatedAt: Date
  }

  type Mutation {
    createPost(author: String!, title: String!, link: String!) : Post
    deletePost(id: ID!) : Post
    createComment(author: String!, content: String!, postId: ID!) : Comment
  }
`;

module.exports = { typeDefs };
