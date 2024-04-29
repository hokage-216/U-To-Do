const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    todos: [Todo]
  }

  type Todo {
    _id: ID!
    content: String!
    completed: Boolean!
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    todos: [Todo]
    user(username: String!): User
  }
  
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    createTodo(content: String!): Todo
    updateTodo(id: ID!, content: String, completed: Boolean): Todo
    deleteTodo(id: ID!): Todo
    login(email: String!, password: String!): Auth
  }`;

  module.exports = typeDefs;