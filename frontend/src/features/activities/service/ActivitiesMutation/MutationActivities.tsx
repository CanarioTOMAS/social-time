import { gql } from "@apollo/client";

const createActivitie = gql`
mutation Mutation($project: ID!, $name: String!, $user: ID, $tiempoEstimado: String, $costoHora: String, $periocidad: String, $colaboradores: [ID]) {
    createActivitie(project: $project, name: $name, user: $user, tiempoEstimado: $tiempoEstimado, costoHora: $costoHora, periocidad: $periocidad, colaboradores: $colaboradores) {
      name
      periocidad
      project {
        id
      }
      tiempoEstimado
      user {
        id
      }
      costoHora
    }
  }`

  export const MutationActivitie={
    createActivitie
  }