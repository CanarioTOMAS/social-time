import { gql } from "apollo-server-express";

module.exports = gql`
  type Record {
    client: Client
    user: User
    name: String!
    id: ID!
  }

  type Mutation {
    createRecord(
      client: String!
      user: String!
      name: String!
    ): Record
    updateRecord(
      _id: String!
      client: String!
      user: String!
      name: String!
    ): Record
    deleteRecord(_id: String!): String
  }
`;
