import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import useForm from '../util/hooks';
import {CREATE_POST_MUTATION, FETCH_ALL_POSTS_QUERY} from '../util/graphql'

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    subject: '',
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(cache, result) {
      const data = cache.readQuery({
        query: FETCH_ALL_POSTS_QUERY
      });
      cache.writeQuery({
        query: FETCH_ALL_POSTS_QUERY,
        data: {
          getAllPosts: [result.data.createPost, ...data.getAllPosts]
        } 
      });
      values.subject = '';
      values.body = '';
    },
    onError(err) {
      console.log(err);
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create a new post:</h2>
        <Form.Field>
          <Form.Input
            placeholder='Subject'
            name='subject'
            onChange={onChange}
            value={values.subject}
            error={error ? true : false}
          />
          <Form.TextArea
            placeholder="Text (Optional)"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="green">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;