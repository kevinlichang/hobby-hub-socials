import gql from 'graphql-tag';

// For HOME
export const FETCH_ALL_POSTS_QUERY = gql`
  {
    getAllPosts {
      id
      body
      subject
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

export const FETCH_SINGLE_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      subject
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

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
      ) {
        id
        email
        username
        createdAt
        token
    }
  }
`;

// For postForm
export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!, $subject: String!) {
    createPost(body: $body, subject: $subject) {
      id
      body
      subject
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

// For the like button
export const LIKE_MUTATION = gql`
  mutation like($postId: ID!) {
    like(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

// Create new comment
export const CREATE_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      subject
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