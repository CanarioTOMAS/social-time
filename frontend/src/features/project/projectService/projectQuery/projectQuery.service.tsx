import { gql } from "@apollo/client";

const Project = gql`
  query FindUserBusiness($idClient: ID) {
    findUserBusiness {
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
