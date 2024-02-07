import { gql } from "@apollo/client";

const Project = gql`
query Query($id: ID) {
  findOneBusiness(_id: $id) {
    client {
      project {
        name
        description
        id
      }
    }
  }
}
`;

export const ProjectQueryService = {
  Project,
};
