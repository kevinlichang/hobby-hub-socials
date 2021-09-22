const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (context) => {
  // context = { ... headers }
  const authorizationHeader = context.req.headers.authorization;
  if (authorizationHeader) {
    // authorization header will be "Bearer [token]"
    const token = authorizationHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authorization header must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};
