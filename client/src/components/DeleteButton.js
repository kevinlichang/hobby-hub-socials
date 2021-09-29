import React, { useState } from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_ALL_POSTS_QUERY } from '../util/graphql'

function DeleteButton({ postId, callback }){
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(cache) {
      setConfirmOpen(false);
      const data = cache.readQuery({
        query: FETCH_ALL_POSTS_QUERY
      })
      cache.writeQuery({
        query: FETCH_ALL_POSTS_QUERY,
        data: {
          getAllPosts: data.getAllPosts.filter(post => post.id !== postId)
        }
      })

      if (callback) callback();
    },
    variables: {postId}
  })

  const deleteButtonClickHandler = () => setConfirmOpen(true);
  const cancelHandler = () => setConfirmOpen(false);

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={deleteButtonClickHandler}
      >
        <Icon name="remove" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={cancelHandler}
        onConfirm={deletePost}
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;