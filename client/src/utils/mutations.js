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

export const ADD_FRIEND = gql`
    mutation addFriend($id: ID!) {
        addFriend(friendId: $id) {
            _id
            username 
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;

export const ADD_THOUGHT = gql`
    mutation addThought($thoughtText: String!) {
        addThought(thoughtText: $thoughtText) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
            }
        }
    }
`;

export const ADD_REACTION = gql`
    mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
        addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
            _id
            reactionCount
            reactions {
                _id
                reactionBody
                createdAt
                username
            }
        }
    }
`;