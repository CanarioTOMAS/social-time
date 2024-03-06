import { gql } from "apollo-server-express";

module.exports = gql`
  type Activitie {
    client: Client!
    project: Project!
    user: User!
    name: String!
    tiempoEstimado: String!
    costoHora: String
    periocidad: String
    description: String
    _id: ID!
    colaboradores: [User]
    record (dia: Date, nameRecord: String, User: ID): [Record]
  }


  type Mutation {
    createActivitie(
      client: ID
      project:  ID
      user:  ID
      name: String!
      tiempoEstimado: String
      costoHora: String
      periocidad: String
      description: String
      colaboradores: [ID]
    ): Activitie
    updateActivitie(
      _id: String!
      user: String!
      project: String!
      client: String!
      name: String
      tiempoEstimado: String
      costoHora: String
      periocidad: String
      colaboradores: [ID]
    ): Activitie
    deleteActivitie(_id: String!): String
  }
`;
