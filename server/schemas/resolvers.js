const { User, Todo, Profile } = require('../models');
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
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('todos');
    },
    todos: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      // obtains a user object that contains the user's ID
      return Todo.find({ user: user.id });
    }
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
    createTodo: async (_, { content }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const todo = new Todo({
        content,
        user: user.id,
        completed: false
      });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, content, completed }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const updates = {};
      if (content !== undefined) updates.content = content;
      if (completed !== undefined) updates.completed = completed;
      const todo = await Todo.findOneAndUpdate({ _id: id, user: user.id }, { $set: updates }, { new: true });
      return todo;
    },
    deleteTodo: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const todo = await Todo.findOneAndDelete({ _id: id, user: user.id });
      return todo;
    },
}};

module.exports = resolvers;
