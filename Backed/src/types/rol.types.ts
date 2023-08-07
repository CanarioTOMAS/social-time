import { gql } from "apollo-server-core";

module.exports = gql`
  type Rol {
    user: User
    business: Business
    roltype: String
  }

  type Query {
    findRol(_id: ID, pageCount: Int, perPage: Int, searchWord: String): [Rol],
  }

  type Mutation {
    createRol(
      user: String
      business: String
      roltype: String
    ): Rol
    updateRol(
      _id: String!
      user: String
      business: String
      roltype: String
    ): Rol
    deleteRol(
      _id: String!
    ): String
  }
`;
