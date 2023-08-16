import { gql } from "@apollo/client";

const FindUserBusiness = gql`
query FindUserBusiness( $pageCount: Int, $perPage: Int, $searchWord: String) {
  findUserBusiness( pageCount: $pageCount, perPage: $perPage,searchWord: $searchWord) {
    name
    address
    category
     email
     image
     phone
     _id
  }

  }
`;

export const businessQueryService={
    FindUserBusiness
}

