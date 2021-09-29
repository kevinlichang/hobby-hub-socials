import React, { useContext } from "react";
import { useQuery } from '@apollo/client'
import { Image, Grid, Segment, Loader, Card, Button, Icon, Label } from 'semantic-ui-react'
import moment from 'moment'

import { FETCH_SINGLE_POST } from '../util/graphql'
import { AuthContext } from "../context/authenticate";
import LikeButton from '../components/LikeButton';
import DeleteButton from "../components/DeleteButton";

function PostDetails(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId; //grab post ID from url
  console.log(postId);

  // Fetch post data
  const { loading, data: { getPost } = {} } = useQuery(FETCH_SINGLE_POST, {
    variables: { postId }
  })

  const deletePostHandler = () => {
    props.history.push('/');
  }

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
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              float="right"
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
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('Comment on post')}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && <DeleteButton postId={id} callback={deletePostHandler} />}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default PostDetails;