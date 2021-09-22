const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const User = require('../../models/User');
const { validateRegister, validateLogin } = require('../../util/validators');
require('dotenv').config();

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    process.env.SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLogin(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Password is incorrect';
        throw new UserInputError('Password is incorrect', { errors });
      }

      const token = createToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
      // Validate user data
      const { valid, errors } = validateRegister(
        username,
        email,
        password,
        confirmPassword
      );
      // valid will be false if there are errors
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      // Make sure user doesn't already exist
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken'
          }
        })
      }

      // Hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save()

      const token = createToken(res);
      
      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}