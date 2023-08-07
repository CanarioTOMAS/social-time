import { gql } from "apollo-server-express";

module.exports = gql`
  type Activitie {
    project: Project
    name: String!
    tiempoEstimado: String
    costoHora: String
    periocidad: String
    _id: ID!
  }

  type Query {
    findActivitie: [Activitie]
    findOneActivitie(id: ID!): Activitie
  }

  type Mutation {
    createActivitie(
      project: ID
      name: String
      tiempoEstimado: String
      costoHora: String
      periocidad: String
      _id: ID!
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
