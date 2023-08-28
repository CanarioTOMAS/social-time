import { gql } from "@apollo/client";

const Project = gql`
  query Project {
    findUserBusiness {
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
