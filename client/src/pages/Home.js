import React from 'react';
// import useQuery Hook from Apollo Client
import { useQuery } from '@apollo/client';
// import thoughts query we created 
import { QUERY_THOUGHTS } from '../utils/queries';
// import ThoughtList ocmponent
import ThoughtList from '../components/ThoughtList';


// when we load the home component, we will execute the query for the thought data
const Home = () => {
  // use useQuery hook to make query request
  // loading propery allows us to conditionally render data based on whether it is there to display or not.
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // get the thought data out of the queries response
  // optional chaining - if 'data' exists, store it in the 'thoughts' constant
    // if data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
