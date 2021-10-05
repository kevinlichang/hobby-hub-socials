import React, { useContext } from 'react'
import { Item, Button, Icon, Label, Container, Popup } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { AuthContext } from '../context/authenticate'
import DeleteButton from './DeleteButton'
import LikeButton from './LikeButton'
import avatar from '../images/avatar.jpg'

function PostItem({ post: { id, username, body, createdAt, likeCount, commentCount, likes } }) {
  const { user } = useContext(AuthContext);

  return (
    <Item.Group>
      <Item>
        <Item.Image size='tiny' src={avatar} />

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
            <Popup
              content="View comments"
              trigger={
                <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                  <Button color='blue' basic>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
              }
            />

            {user && user.username === username && <DeleteButton postId={id} />}
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default PostItem;