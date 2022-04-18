const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// import database connection
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data 
  // so they know what our API looks like and how it resolves requests
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  // connect our Apollo server to our Express.js server
  // This will create a special /graphql endpoint for the express server that will serve as the main endpoint for accessing the entire API
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

// Initialize the APollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// listen for connection to be made
// upon successful connection, we start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
