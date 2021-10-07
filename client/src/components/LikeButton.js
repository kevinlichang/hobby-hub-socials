import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, Icon, Popup } from 'semantic-ui-react'

import { useMutation } from '@apollo/client'
import { LIKE_MUTATION } from '../util/graphql'

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const handleLikeButton = user ? (
    liked ? (
      <Button color="green">
        <Icon name="thumbs up" />
      </Button>
    ) : (
      <Button color="green" basic>
        <Icon name="thumbs up" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="green" basic>
      <Icon name="thumbs up" />
    </Button>
  );

  const [likePost] = useMutation(LIKE_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err);
    }
  })

  return (
    <Popup
      content={liked ? "Unlike" : "Like"}
      inverted
      position='bottom left'
      trigger={
        <Button labelPosition='right' as='div' onClick={likePost}>
          {handleLikeButton}
          <Label as='a' basic color='green' pointing='left'>
            {likeCount}
          </Label>
        </Button>
      }
    />

  )
}

export default LikeButton;