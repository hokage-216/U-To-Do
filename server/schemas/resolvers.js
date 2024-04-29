const { User, Todo } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
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
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError
      }

      const token = signToken(user);

      return { token, user };
    },
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
