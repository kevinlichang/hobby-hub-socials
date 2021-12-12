const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');

const mongoose = require('mongoose');

require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const PORT = process.env.PORT || 5000;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req })
// });



// mongoose.connect(process.env.DB_URI,
//   { useNewUrlParser: true }
// ).then(() => {
//   console.log('MongoDB successfully connected');
//   return server.listen({ port: PORT });
// }).then((res) => {
//   console.log(`Server running at ${res.url}`)
// }).catch((error) => {
//   console.log("Unable to connect to MongoDB");
//   console.error(error);
// });

// async function startServer() {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   await server.start();

//   const app = express();

//   server.applyMiddleware({ app });

//   await new Promise(r => app.listen({ port: PORT }, r));

//   console.log(`🚀 Server ready at http://localhost:4000${res.url}`);
// }

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => ({ req })
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
     app,

     // By default, apollo-server hosts its GraphQL endpoint at the
     // server root. However, *other* Apollo Server packages host it at
     // /graphql. Optionally provide this to match apollo-server.
     path: '/'
  });

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true }
).then(() => {
  console.log('MongoDB successfully connected');
  return startApolloServer(typeDefs, resolvers)
}).catch((error) => {
  console.log("Unable to connect to MongoDB");
  console.error(error);
});
