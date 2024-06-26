import { gql } from "apollo-server-express";

module.exports = gql`
  type Project {
    client: Client!
    name: String!
    description: String
    id: ID!
    deleted: Boolean
    activitie (nameActivitie: String, User: ID): [Activitie]
  }

  type Mutation {
    createProject(
      client: String!
      name: String!
      description: String
    ): Project
    updateProject(
      _id: String!
      client: String!
      name: String!
      description: String
    ): Project
    deleteProject(_id: String!): String
  }
`;
