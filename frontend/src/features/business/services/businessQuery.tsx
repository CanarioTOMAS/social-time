import { gql } from "@apollo/client";

const FindUserBusiness = gql`
  query Client($id: ID) {
    findUserBusiness(_id: $id) {
      _id
      name
      phone
      email
      address
      image
    }
  }
`;

export const businessQueryService = {
  FindUserBusiness,
};
