import { gql } from "@apollo/client";

const createActivitie = gql`
  mutation CreateActivitie(
    $project: ID!
    $name: String!
    $user: ID
    $client: ID
    $tiempoEstimado: String
    $costoHora: String
    $description: String
  ) {
    createActivitie(
      project: $project
      name: $name
      user: $user
      client: $client
      tiempoEstimado: $tiempoEstimado
      costoHora: $costoHora
      description: $description
    ) {
      name
    }
  }
`;

export const MutationActivitie = {
  createActivitie,
};
