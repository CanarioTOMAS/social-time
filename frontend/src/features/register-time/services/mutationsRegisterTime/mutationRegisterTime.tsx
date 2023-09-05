import { gql } from "@apollo/client";


const createRegisterTime= gql`
mutation Mutation($client: String!, $user: String!, $name: String!) {
    createRecord(client: $client, user: $user, name: $name) {
      client {
        id
      }
      user {
        id
      }
      name
      id
    }
  }
`

export const RegisterTimeMutation = {
    createRegisterTime
  };
  