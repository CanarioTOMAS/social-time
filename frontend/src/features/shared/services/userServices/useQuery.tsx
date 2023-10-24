import { gql } from "@apollo/client";

const getUserById =gql`
query FindUserBusiness($id: ID) {
    findUserBusiness(_id: $id) {
      name
      address
      category
      image
      email
      phone
    }
  }`

export default getUserById;