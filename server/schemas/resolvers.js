const { Profile } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     return Profile.findOne({ _id: context.user._id });
    //   }
    //   throw AuthenticationError;
    // },
  },
  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },
    // Add a third argument to the resolver to access data in our `context`
    addTodo: async (parent, { todo }, context) => {
      if (context.user) {
        const profileId = context.user._id;
        // Assuming Todo model exists and is imported
        const newTodo = await Todo.create({ todo, createdBy: profileId });
        return newTodo;
      }
      throw AuthenticationError;
    },
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
    removeTodo: async (parent, { todoId }, context) => {
      if (context.user) {
        // Assuming Todo model exists and is imported
        return Todo.findOneAndDelete({ _id: todoId, createdBy: context.user._id });
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
