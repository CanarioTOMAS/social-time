import { gql } from "@apollo/client";

const clients = gql`
query FindOneBusiness($id: ID) {
  findOneBusiness(_id: $id) {
    client {
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
