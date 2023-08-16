import { gql } from "@apollo/client";

const clients = gql`
query FindOneBusiness($id: ID) {
  findOneBusiness(_id: $id) {
    client {
      name
      email
      phone
    }
  }
}
`;
export const QueryClientService = {
  clients,
};
