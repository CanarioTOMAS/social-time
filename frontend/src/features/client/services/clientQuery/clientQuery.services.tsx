import { gql } from "@apollo/client";

const clients = gql`
query Client {
  findUserBusiness {
    client {
      id
      name
      image
      city
      address
      email
      phone
      postCode
      documentType
      documentNumber
      surname
      }
    }
  }
`;
export const QueryClientService = {
  clients,
};
