const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
// import database connection
const db = require('./config/connection');
// import authMiddleware
const { authMiddleware } = require('./utils/auth');
// import path module 
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data 
  // so they know what our API looks like and how it resolves requests
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // pass in a context method that is set to return what we want available in the resolvers
    // ensures every request performs an auth check, and updated request object will be passed ot the resolvers as the context 
    context: authMiddleware
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


// serve up static assets
// check to see if Node environment is in production
if (process.env.NODE_ENV === 'production') {
  // serve any files in the React applicaiton's 'build' directory 
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// wildcard GET route, to respond with production ready front-end code if a request is made to a route not defined
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// listen for connection to be made
// upon successful connection, we start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
