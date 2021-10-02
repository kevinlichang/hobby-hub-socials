import React, { useContext, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Image, Grid, Segment, Loader, Card, Button, Icon, Label, Form, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { FETCH_SINGLE_POST, CREATE_COMMENT_MUTATION } from '../util/graphql'
import { AuthContext } from '../context/authenticate'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import avatar from '../images/avatar.jpg'

function PostDetails(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId; //grab post ID
  
  const [commentBody, setCommentBody] = useState('');

  // Fetch post data
  const { loading, data: { getPost } = {} } = useQuery(FETCH_SINGLE_POST, {
    variables: { postId }
  })


  // Return to main page after deleting post
  const deletePostHandler = () => {
    props.history.push('/');
  }

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: { postId, body: commentBody},
    update(cache, result) {
      setCommentBody('');
      cache.writeQuery({
        query: FETCH_SINGLE_POST,
        data: {
          getPost: result.data.createComment
        }
      })
    }
  });

  // Show loader while waiting for getPost query to return
  if (loading) {
    return (
      <Segment basic>
        <Loader active />
      </Segment>
    )
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;
    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={3}>
            <Image
              src={avatar}
              float='right'
            />
          </Grid.Column>

          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Button
                  as='div'
                  labelPosition='right'
                  onClick={() => console.log('Comment on post')}
                >
                  <Button basic color='blue'>
                    <Icon name='comments' />
                  </Button>
                  <Label basic color='blue' pointing='left'>
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} callback={deletePostHandler} />}
              </Card.Content>
            </Card>

            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}

            {user ? (
              <Card fluid>
                <Card.Content>
                  <p>Write a comment</p>
                  <Form>
                    <Form.Group>
                      <Form.Input
                        width={14}
                        placeholder='Type Here!'
                        name='body'
                        value={commentBody}
                        onChange={event => setCommentBody(event.target.value)}
                      />
                      <Form.Button
                        color='green'
                        content='Submit'
                        type='submit'
                        disabled={commentBody.trim() === ''}
                        onClick={createComment}
                      />
                    </Form.Group>
                  </Form>
                </Card.Content>
              </Card>
            ) : (
              <Message info size='big' width={16} className='detail-page-message'>
                <Message.Header>Make a comment!</Message.Header>
                <p>
                  Just log in or register
                </p>
                <Button as={Link} to="/login" >
                  Login
                </Button>
                <Button as={Link} to="/register">
                  Register
                </Button>
              </Message>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default PostDetails;