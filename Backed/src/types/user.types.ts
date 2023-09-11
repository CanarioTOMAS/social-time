import { gql } from "apollo-server-core";

module.exports = gql`
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
    deleted: Boolean
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
    deleteUser(id: ID!): User
  }
`;
