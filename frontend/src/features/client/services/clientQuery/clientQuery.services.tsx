import { gql } from "@apollo/client";

const clients = gql`
  query FindUserBusiness($id: ID!) {
    findUserBusiness(_id: $id) {
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
