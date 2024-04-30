const typeDefs = `

  type Profile {
    _id: ID!
    name: String!
    email: String!
    password: String!
    todos: [Todo]!
  }

  type Todo {
    _id: ID!
    todo: String
    createdBy: Profile
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]
    profile(profileId: ID!): Profile
    me: Profile
  }
  
  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTodo(todo: String!): Todo
    removeProfile: Profile
    removeTodo(todoId: ID!): Todo
  }`;

module.exports = typeDefs;
