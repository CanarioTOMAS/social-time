import { gql } from "@apollo/client";

const Project = gql`
  query Project($idClient: ID, $id: ID) {
    findUserBusiness(_id: $id) {
      client(idClient: $idClient) {
        project {
          id
          description
          name
          client {
            name
          }
        }
      }
    }
  }
`;

export const ProjectQueryService = {
  Project,
};
