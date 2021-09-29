import React, { useContext } from 'react'
import { Item, Button, Icon, Label, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../context/authenticate';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

function PostItem({ post: { id, username, body, createdAt, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);

  function commentClick() {
    console.log('Comment clicked');
  }

  return (
    <Item.Group>
      <Item>
        <Item.Image size='tiny' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />

        <Item.Content >
          <Item.Header>{username}</Item.Header>
          <Container as={Link} to={`/posts/${id}`}>
            <Item.Meta className="block">{moment(createdAt).fromNow(true)}</Item.Meta>
            <Item.Description className="block post-body">
              {body}
            </Item.Description>
          </Container>

          <Item.Extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <Button labelPosition='right' as={Link} to={`/posts/id`} onClick={commentClick}>
              <Button color='blue' basic>
                <Icon name='comments' />
              </Button>
              <Label basic color='blue' pointing='left'>
                {commentCount}
              </Label>
            </Button>
            {user && user.username === username && <DeleteButton postId={id} />}
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default PostItem;