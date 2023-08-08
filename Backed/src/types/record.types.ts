import { gql } from "apollo-server-express";

module.exports = gql`
  type Record {
    activity: String!
    user: User!
    date: String
    startTime: String
    endTime: String
    hours: String
    id: ID!
  }

  type Query {
    findRecord: [Record]
    findOneRecord(id: ID!): Record
  }

  type Mutation {
    createRecord(
      activity: String!
      user: String!
      date: String
      startTime: String
      endTime: String
      hours: String
    ): Record
    updateRecord(
      _id: String!
      activity: String!
      user: String!
      date: String
      startTime: String
      endTime: String
      hours: String
    ): Record
    deleteRecord(_id: String!): String
  }
`;
