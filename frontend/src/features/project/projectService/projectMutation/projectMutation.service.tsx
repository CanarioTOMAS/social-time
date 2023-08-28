import { gql } from "@apollo/client";

const CreateProject = gql`
  mutation CreateProject(
    $client: String!
    $name: String!
    $description: String
  ) {
    createProject(
      client: $client
      name: $name
      description: $description
    ) {
      id
    }
  }
`;

const UpdateProject = gql`
  mutation UpdateProject(
    $id: String!
    $client: String!
    $name: String!
  ) {
    updateProject(
      _id: $id
      client: $client
      name: $name
    ) {
      id
      client
      name
    }
  }
`;

const DeleteProject = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(_id: $id)
  }
`;

export const ProjectMutationServices = {
  CreateProject,
  UpdateProject,
  DeleteProject,
};