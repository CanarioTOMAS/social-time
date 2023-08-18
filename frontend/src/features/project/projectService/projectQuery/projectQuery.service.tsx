import { gql } from "@apollo/client";

const Project = gql`
  query Project($client: String!) {
    findProject(client: $client) {
      name
      id
    }
  }
`;

export const ProjectQueryService = {
  Project,
};
