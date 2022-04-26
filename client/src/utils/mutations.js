import { gql } from '@apollo/client';

// log mutation accepts two variables $email and $password
// whose values we set up to be passed in as arguments when we integrate with login form
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// returning data is same as above, so users dont need to login after they sign up
// the names and formats we use have to match what we set up on the server
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;