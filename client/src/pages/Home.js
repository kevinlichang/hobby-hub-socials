import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { Grid, Segment, Dimmer, Loader, Transition } from 'semantic-ui-react'

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
    <Grid>
      <Grid.Row className="page-title">
        <h1>New Posts</h1>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={5}>
          <Grid>
            <Grid.Row>
              {user && (
                
                  <PostForm />

              )}
            </Grid.Row>
          </Grid>

        </Grid.Column>
        <Grid.Column width={9}>
          <Grid divided={'vertically'}>
            {loading ? (
              <Grid.Row centered>
                <Segment>
                  <Dimmer active inverted>
                    <Loader inverted size="tiny"/>
                  </Dimmer>
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