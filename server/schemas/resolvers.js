// resolver that will serve the response for the query
const resolvers = {
    Query: {
        // methods get the same name of the query or mutation they are for
        helloWorld: () => {
            return 'Hello world!';
        }
    }
};

// export the resolvers
module.exports = resolvers;