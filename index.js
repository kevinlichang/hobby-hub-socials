const { ApolloServer } = require('apollo-server');

const mongoose = require('mongoose');

require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true }
).then(() => {
  console.log('MongoDB successfully connected');
  return server.listen({ port: PORT });
}).then((res) => {
  console.log(`Server running at ${res.url}`)
}).catch((error) => {
  console.log("Unable to connect to MongoDB");
  console.error(error);
});
