import React from 'react';
// import useQuery Hook from Apollo Client
import { useQuery } from '@apollo/client';
// import thoughts query we created 
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
// import ThoughtList ocmponent
import ThoughtList from '../components/ThoughtList';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';


// when we load the home component, we will execute the query for the thought data
const Home = () => {
  // use useQuery hook to make query request
  // loading propery allows us to conditionally render data based on whether it is there to display or not.
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract 'data' from the 'useQuery' Hook's response and rename it 'userData to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // if logged in, loggedIn variable will be true, if not, false
  const loggedIn = Auth.loggedIn();
  // get the thought data out of the queries response
  // optional chaining - if 'data' exists, store it in the 'thoughts' constant
    // if data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className='col-12 mb-3'>
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
