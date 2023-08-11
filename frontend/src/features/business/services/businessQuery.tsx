import { gql } from "@apollo/client";

const FindUserBusiness = gql`
query FindUserBusiness($findOneUserId: ID!) {
    findOneUser(id: $findOneUserId) {
      business {
        _id
        client {
          id
        }
        phone
        image
        email
        category
        address
        name
      }
    }
  }
`;


export const businessQueryService={
    FindUserBusiness
}