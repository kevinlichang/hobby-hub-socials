import React, {useState} from 'react';
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';

import { REGISTER_USER } from '../util/graphql';


function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }


  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      proxy,
      result
    ) {
      console.log(result)
    },
    variables: values
  });

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  }

  return (
    <div>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          type="text"
          value={values.username}
          // error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          // error={errors.email ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          // error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password.."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          // error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  )
};

export default Register;