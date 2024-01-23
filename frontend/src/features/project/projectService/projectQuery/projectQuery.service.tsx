import { gql } from "@apollo/client";

const Project = gql`
query FindOneBusiness($id: ID, $idClient: ID) {
  findOneBusiness(_id: $id) {
    client(idClient: $idClient) {
        id
        name
        project {
          description
          id
          name
        }
      }
    }
  }
`;

export const ProjectQueryService = {
  Project,
};
