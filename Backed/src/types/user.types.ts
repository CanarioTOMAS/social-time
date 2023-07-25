module.exports = `#graphql
  type User {
    name: String!
    surname: String!
    email: String!
    password: String!
    role: String
    image: String
    address: String
    gender: String
    phone: String
    id: ID!
    business: [Business]
  }

  type Query {
    me: User,
    findUser: [User],
    findOneUser(id: ID!): User,
  }

  type Token {
    value: String!
    id: ID!
  }

  type Mutation {
    createUser(
      name: String!
      surname: String!
      email: String!
      password: String!
      role: String
      image: String
      address: String
      gender: String
      phone: String
    ): User
    login(email: String!, password: String!): Token
    validateToken (token: String!): String
  }
`;
