const { UserInputError, AuthenticationError } = require('apollo-server-express');
const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

const authorizeUser = require('../../util/authorize');

commentResolvers = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = authorizeUser(context);

      if (body.trim() === '') {
        throw new Error('Comment body cannot be empty');
      }

      const post = await Post.findById(postId);

      if (post) {

        const newComment = new Comment({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
          user: user.id,
          post: post.id
        })
  
        const savedComment = await newComment.save();
        post.comments.push(savedComment);
        const updatedPost = await post.save();
        return updatedPost;
      } else {
        throw new UserInputError('Post is not found');
      }
    },
    async deleteComment(_, { postId, commentId }, context) {
      const user = authorizeUser(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentToDelete = await Comment.findById(commentId);
        if (commentToDelete.username === user.username) {
          await commentToDelete.delete();
          
          const index = post.comments.findIndex((comment) => comment.id === commentId);
          if (post.comments[index].username === user.username) {
            post.comments.splice(index, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError('[Comment Array: Username mismatched from comment owner');
          }
        } else {
          throw new AuthenticationError('Username mismatched from comment owner');
        }

      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
}

module.exports = commentResolvers;