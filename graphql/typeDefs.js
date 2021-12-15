const { gql } = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

gqlSchema = gql`
  scalar Upload

  type File {
    id: ID!
    url: String!
  }
  type Post{
    id: ID!
    body: String!
    subject: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
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
    createPost(body: String!, subject: String!): Post!
    createComment(postId: ID!, body: String!): Post!
    deletePost(postId: ID!): String!
    deleteComment(postId: ID!, commentId: ID!): Post!
    like(postId: ID!): Post!
    uploadFile(file: Upload!): File!
  }
`;

module.exports = gqlSchema;