import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'

import PostItem from '../components/PostItem'
import PostForm from '../components/PostForm'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import { AuthContext } from '../context/authenticate'

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const posts = data.getAllPosts

  return (
    <Grid>
      <Grid.Row className="page-title">
        <h1>New Posts</h1>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={5}>
          <Grid>
            <Grid.Row>
              {user && (
                <Grid.Column>
                  <PostForm />
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>

        </Grid.Column>
        <Grid.Column width={9}>
          <Grid divided={'vertically'}>
            {loading ? (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
              </Segment>
            ) : (
              posts && posts.map(post => (
                <Grid.Row key={post.id}>
                  <PostItem post={post} />
                </Grid.Row>
              ))
            )}
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default Home;