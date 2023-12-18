import { gql } from "apollo-server-express";

module.exports = gql`
  type Activitie {
    project: Project!
    user: User!
    name: String!
    tiempoEstimado: String
    costoHora: String
    periocidad: String
    _id: ID!
    colaboradores: [User]
    record (dia: Date, nameRecord: String, User: ID): [Record]
  }


  type Mutation {
    createActivitie(
      project: ID!
      user: ID
      name: String!
      tiempoEstimado: String
      costoHora: String
      periocidad: String
      colaboradores: [ID]
    ): Activitie
    updateActivitie(
      _id: String!
      user: [ID]
      name: String
      tiempoEstimado: String
      costoHora: String
      periocidad: String
      colaboradores: [ID]
    ): Activitie
    deleteActivitie(_id: String!): String
  }
`;
