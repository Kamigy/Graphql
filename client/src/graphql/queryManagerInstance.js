import gql from "graphql-tag";
import graphqlClient from ".";

class QueryManager {
  async createPost(title, author, link) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CreatePost($title: String!, $author: String!, $link: String!) {
          createPost(title: $title, author: $author, link: $link) {
            _id
            title
            author
            link
            createdAt
          }
        }
      `,
      variables: { title, author, link },
    });
    return response.data.createPost;
  }

  async getPosts(order = "asc") {
    const response = await graphqlClient.query({
      query: gql`
        query GetPosts($order: String!) {
          posts(order: $order) {
            _id
            title
            author
            link
            createdAt
          }
        }
      `,
      variables: { order },
    });
    return response.data.posts;
  }

  async getPost(id) {
    const response = await graphqlClient.query({
      query: gql`
        query GetPost($id: ID!) {
          post(id: $id) {
            _id
            title
            author
            link
            createdAt
          }
        }
      `,
      variables: { id },
    });
    return response.data.post;
  }

  async deletePost(postId) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation DeletePost($postId: ID!) {
          deletePost(id: $postId) {
            _id
          }
        }
      `,
      variables: { postId },
    });
    console.log(response.data);
    return postId;
  }

  async createComment(author, content, postId) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation CreateComment($author: String!, $content: String!, $postId: ID!) {
          createComment(author: $author, content: $content, postId: $postId) {
            _id
            content
            author
            postId
          }
        }
      `,
      variables: { author, content, postId },
    });
    return response.data.createComment;
  }

  async getPostComments(postId) {
    const response = await graphqlClient.query({
      query: gql`
        query GetCommentsByPostId($postId: ID!) {
          commentsByPostId(postId: $postId) {
            _id
            content
            author
            postId
            createdAt
          }
        }
      `,
      variables: { postId },
    });
    return response.data.commentsByPostId;
  }
}

export default new QueryManager();
