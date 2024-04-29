const typeDefs = `

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    todos: [Todo]!
  }

  type Todo {
    _id: ID
    todo: String
    createdBy: Profile

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
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  
    users: [User]
    todos: [Todo]
    user(username: String!): User
  }
  
  type Mutation {
     addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addTodo(todo: String!): Todo
    removeProfile: Profile
    removeTodo(todoId: ID!): Todo
    
    
    addUser(username: String!, email: String!, password: String!): Auth
    createTodo(content: String!): Todo
    updateTodo(id: ID!, content: String, completed: Boolean): Todo
    deleteTodo(id: ID!): Todo
    login(email: String!, password: String!): Auth
  }`;

module.exports = typeDefs;
