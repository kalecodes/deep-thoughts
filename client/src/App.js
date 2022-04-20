import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// establish a new link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql'
});
// instantiate the Apollo Client instance and creat the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  // instantiate a new cache object
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>  
    </ApolloProvider>
    
  );
}

export default App;
