import { gql } from "apollo-server-express";

module.exports = gql`
  type Roltype {
    name: String!
    description: String
    id: ID!
  }

  type Query {
    findRolType: [Roltype]
  }

  type Mutation {
    createRolType(
      name: String!
      description: String
    ): Roltype
    updateRolType(
      _id: String!
      name: String!
      description: String
    ): Roltype
    deleteRolType(_id: String!): String
  }
`;
