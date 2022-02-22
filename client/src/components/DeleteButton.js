import React, { useState } from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Confirm, Popup } from 'semantic-ui-react';
import { FETCH_ALL_POSTS_QUERY } from '../util/graphql'

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutationChoice = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deleteSelected] = useMutation(mutationChoice, {
    update(cache) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = cache.readQuery({
          query: FETCH_ALL_POSTS_QUERY
        })
        cache.writeQuery({
          query: FETCH_ALL_POSTS_QUERY,
          data: {
            getAllPosts: data.getAllPosts.filter(post => post.id !== postId)
          }
        })
      }
      if (callback) callback();
    },
    variables: { postId, commentId }
  })

  const deleteButtonClickHandler = () => setConfirmOpen(true);
  const cancelHandler = () => setConfirmOpen(false);

  return (
    <>
      <Popup
        content="Delete"
        inverted
        position='bottom center'
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            icon='remove'
            size='tiny'
            circular
            onClick={deleteButtonClickHandler}
          >
          </Button>}
      />
      <Confirm
        open={confirmOpen}
        content='Are you sure you want to delete this post?'
        cancelButton='No'
        confirmButton='Yes'
        onCancel={cancelHandler}
        onConfirm={deleteSelected}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default DeleteButton;