import { gql } from "apollo-server-express";


module.exports = gql`
scalar Date
  type Record {
    activities: Activitie
    user: User
    inicio: Date
    fin: Date
    name: String
    id: ID!
    deleted: Boolean
  }

  type Mutation {
    createRecord(
      activities: ID!
      inicio: Date!
      fin: Date!
      user: ID!
      name: String!
    ): Record
    updateRecord(
      _id: String!
      activities: ID!
      inicio: Date!
      fin: Date!
      user: String!
      name: String!
    ): Record
    deleteRecord(_id: String!): String
  }
`;
