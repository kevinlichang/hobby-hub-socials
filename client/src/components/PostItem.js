import React from 'react'
import { Item, Button, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

function PostItem ({ post: { id, username, body, createdAt, likeCount, commentCount, likes } }) {
  function likeClick() {
    console.log('Like clicked');
  }
  
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
            <Button as='div' labelPosition='right' onClick={likeClick}>
              <Button color='green' basic>
                <Icon name='thumbs up' />
                Like
              </Button>
              <Label as='a' basic color='green' pointing='left'>
                {likeCount}
              </Label>
            </Button>
            <Button as='div' labelPosition='right' onClick={commentClick}>
              <Button color='blue' basic>
                <Icon name='comments' />
                {commentCount}
              </Button>
              <Label as='a' basic color='blue' pointing='left'>
                {likeCount}
              </Label>
            </Button>

          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default PostItem;