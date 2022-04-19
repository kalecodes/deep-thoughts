const { User, Thought } = require("../models");

// resolver that will serve the response for the query
const resolvers = {
    Query: {
        // pass in parent as a placeholder
        // methods get the same name of the query or mutation they are for
        thoughts: async (parent, { username }) => {
            // use a ternary operator to check if usernmae exists
            // if username exists, we set params to an object with a 'username' key as its value
            // if it doesn't, we return an empty object
            const params = username ? { username } : {};
            // pass params object (with or without date)  to our .find method
            // return all thought data in descending order
            return Thought.find(params).sort({ createdAt: -1 });
        }
    }
};

// export the resolvers
module.exports = resolvers;