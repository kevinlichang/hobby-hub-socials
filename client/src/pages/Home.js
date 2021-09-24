import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'

import PostItem from '../components/PostItem'
import { FETCH_POSTS_QUERY } from '../util/graphql'

function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  const posts = data.getAllPosts

  return (
    <Grid>
      <Grid.Row className="page-title">
        <h1>New Posts</h1>
      </Grid.Row>

        {loading ? (
          <Segment>
            <Dimmer active>
              <Loader />
            </Dimmer>
          </Segment>
        ) : (
          posts && posts.map(post => (
            <Grid.Row key={post.id} >
              <PostItem post={post} />
            </Grid.Row>
          ))
        )}

    </Grid>
  )
};

export default Home;