import React, { useContext } from 'react'
import { Item, Button, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../context/authenticate';
import DeleteButton from './DeleteButton';
import LikeButton from './LikeButton';

function PostItem ({ post: { id, username, body, createdAt, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);
  
  function commentClick() {
    console.log('Comment clicked');
  }

  return (
    <Item.Group>
      <Item>
        <Item.Image size='small' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />

        <Item.Content>
          <Item.Header as='a'>{username}</Item.Header>
          <Item.Meta as={Link} to={`/posts/${id}`} className="block">{moment(createdAt).fromNow(true)}</Item.Meta>
          <Item.Description>
            {body}
          </Item.Description>
          <Item.Extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <Button  labelPosition='right' as={Link} to={`/posts/id`} onClick={commentClick}>
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