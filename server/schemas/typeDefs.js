const typeDefs = `

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    todos: [String]
  }

  type Todo {
    _id: ID
    todos: String
  }

  type Auth {
    token: ID
    profile: Profile
  }

  type Query {
    me: Profile
  }
  
  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTodo(profileId: ID!, todos: String!): Todo
    removeProfile: Profile
    removeTodo(todoId: ID!): Todo
  }`;

module.exports = typeDefs;
