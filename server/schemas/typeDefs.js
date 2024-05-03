const typeDefs = `

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    todos: [String]
  }

  type Auth {
    token: ID
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    me: Profile
  }
  
  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addTodo(profileId: ID!, todo: String!): Profile
    removeProfile: Profile
    removeTodo(todo: String!): Profile
  }
`;

module.exports = typeDefs;
