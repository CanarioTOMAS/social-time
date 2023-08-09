import { gql } from "apollo-server-express";

module.exports = gql`
  type Project {
    client: Client
    user: User
    name: String!
    id: ID!
  }

  type Query {
    findProject: [Project]
    findOneProject(id: ID!): Project
  }

  type Mutation {
    createProject(
      client: String!
      user: String!
      name: String!
    ): Project
    updateProject(
      _id: String!
      client: String!
      user: String!
      name: String!
    ): Project
    deleteProject(_id: String!): String
  }
`;
