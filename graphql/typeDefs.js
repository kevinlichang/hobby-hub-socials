const { gql } = require('apollo-server');

gqlSchema = gql`
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
  }
  type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Comment{
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }
  type Like{
    id: ID!
    username: String!
    createdAt: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query{
    getAllPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    createComment(postId: String!, body: String!): Comment!
    deletePost(postId: ID!): String!
    deleteComment(postId: ID!, commentId: ID!): Post!
    like(postId: ID!): Post!
  }
  type Follow {
    newPost: Post!
  }
`;

module.exports = gqlSchema;