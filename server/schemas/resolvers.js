const { User, Thought } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        },
        // find a single thought
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // me method
        me: async (parent, args, context) => {
            // check for existence of context.user or not 
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('thoughts')
                    .populate('friends');

                return userData;    
            }
            // throw AuthenticationError if no authenticated
            throw new AuthenticationError('Not logged in');
                
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        }
    },
    Mutation: {
        // Mongoose User model creates a new user in the db with whatever is passed in as 'args'
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user};
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect cedentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addThought: async (parent, args, context) => {
            if (context.user) {
                const thought = await Thought.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { thoughts: thought._id } },
                    // return updated document
                    { new: true }
                );

                return thought;
            }

            // only logged in users can use this mutation
            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
                const updatedThought = await Thought.findOneAndUpdate(
                    { _id: thoughtId},
                    { $push: { reactions: { reactionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedThought;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // using addToSet instead of push since a user cant be friends with the same person twice (prevents duplicate entries)
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need ot be logged in!');
        }
    }
};

// export the resolvers
module.exports = resolvers;