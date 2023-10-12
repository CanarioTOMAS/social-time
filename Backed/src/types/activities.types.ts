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
    record (nameRecord: String, User: ID): [Record]
  }


  type Mutation {
    createActivitie(
      project: ID!
      user: ID
      name: String!
      tiempoEstimado: String
      costoHora: String
      periocidad: String
    ): Activitie
    updateActivitie(
      _id: String!
      name: String
      tiempoEstimado: String
      costoHora: String
      periocidad: String
    ): Activitie
    deleteActivitie(_id: String!): String
  }
`;
