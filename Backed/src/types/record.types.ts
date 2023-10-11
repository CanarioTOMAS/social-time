import { gql } from "apollo-server-express";

module.exports = gql`
  type Record {
    activities: Activitie
    user: User
    inicio: String
    fin: String
    name: String
    id: ID!
    deleted: Boolean
  }

  type Mutation {
    createRecord(
      activities: ID!
      inicio: String!
      fin: String!
      user: ID!
      name: String!
    ): Record
    updateRecord(
      _id: String!
      activities: ID!
      inicio: String!
      fin: String!
      user: String!
      name: String!
    ): Record
    deleteRecord(_id: String!): String
  }
`;
