import { gql } from "@apollo/client";

const FindUserBusiness = gql`

query FindUserBusiness {
  findUserBusiness {
    _id
    address
    category
    email
    phone
    name
    image
  }
}
`;

export const businessQueryService={
    FindUserBusiness
}

