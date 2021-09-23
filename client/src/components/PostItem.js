import React from 'react'
import { Item } from 'semantic-ui-react'
import moment from 'moment'

let PostItem = ({ post: { id, username, body, createdAt, likeCount, commentCount, likes } }) => {
  return (
    <Item.Group>
      <Item>
        <Item.Image size='small' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />

        <Item.Content>
          <Item.Header as='a'>{username}</Item.Header>
          <Item.Meta>{moment(createdAt).fromNow()}</Item.Meta>
          <Item.Description>
            {body}
          </Item.Description>
          <Item.Extra>likes {likeCount}</Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  )
}

export default PostItem;