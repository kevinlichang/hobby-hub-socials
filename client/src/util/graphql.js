import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getAllPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;