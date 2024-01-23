import { gql } from "@apollo/client";

const clients = gql`
  query FindOneBusiness($id: ID!) {
    findOneBusiness(_id: $id) {
      client {
        id
        name
        surname
        email
        phone
        documentType
        documentNumber
        address
        city
        postCode
        image
      }
    }
  }
`;

export const QueryClientService = {
  clients,
};
