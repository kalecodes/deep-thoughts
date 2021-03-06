// this file will  hold code and functionality that isnt necessarily React-based
import { gql } from '@apollo/client';

export const QUERY_THOUGHTS = gql`
    query thoughts($username: String) {
        thoughts(username: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

export const QUERY_THOUGHT = gql`
    query thought($id: ID!) {
        thought(_id: $id) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
            thoughts {
                _id
                thoughtText
                createdAt
                reactionCount
            }
        }
    }
`

// queries to retrieve logged in user's data
export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            friendCount
            thoughts {
                _id
                thoughtText
                createdAt
                reactionCount
                reactions {
                    _id
                    createdAt
                    reactionBody
                    username
                }
            friends {
                _id
                username 
            }
            }
        }
    }
`;

// simpler me query to use for the homepage of the logged in user
export const QUERY_ME_BASIC = gql `
    {
        me {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
        }
    }
`;