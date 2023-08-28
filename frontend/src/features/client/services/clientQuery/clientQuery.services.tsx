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
        documentNumber
      }
    }
  }
`;

export const QueryClientService = {
  clients,
};
