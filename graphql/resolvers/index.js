const postResolvers = require('./posts');
const userResolvers = require('./users');
const commentResolvers = require('./comments');
const fileResolvers = require('./files');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

module.exports = {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    }
  },
  Upload: GraphQLUpload,
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...fileResolvers.Mutation
  }
}