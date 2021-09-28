import React, { useState } from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Button, Icon, Confirm } from 'semantic-ui-react';

function DeleteButton({ postId }){
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      // TODO: remove post from cache
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