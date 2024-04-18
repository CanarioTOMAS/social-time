import { gql } from "apollo-server-core";

module.exports = gql`
type Query {
  getLoggedInUserId: ID!
  getLoggedInUserInfo: User! # Nueva consulta para obtener la información del usuario logueado
  getAllUsers: [User]
}

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
  ativitie: [Activitie]
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
    deleted: Boolean
  ): User
  login(email: String!, password: String!): Token
  validateToken (token: String!): String
  deleteUser(id: ID!): User
}

`;
