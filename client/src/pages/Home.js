import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Grid, Segment, Loader, Transition, Message, Button } from 'semantic-ui-react'

import PostItem from '../components/PostItem'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import { AuthContext } from '../context/authenticate'

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: posts } = useQuery(FETCH_POSTS_QUERY);

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  // const posts = data.getAllPosts

  return (
    <Grid relaxed>
      <Grid.Row className="page-title">
        <h1>New Posts</h1>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={5}>
          {user ? (
            <PostForm />
          ) : (
            <Message info size='big'>
              <Message.Header>Create your own post!</Message.Header>
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
        <Grid.Column width={11}>
          <Grid divided={'vertically'}>
            {loading ? (
              <Grid.Row centered >
                <Segment basic>
                  
                  <Loader active />
                  
                </Segment>
              </Grid.Row>
            ) : (
              <Transition.Group>
                {posts.getAllPosts && posts.getAllPosts.map(post => (
                  <Grid.Row key={post.id}>
                    <PostItem post={post} />
                  </Grid.Row>
                ))}
              </Transition.Group>
            )}
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default Home;