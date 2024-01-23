import { gql } from "@apollo/client";

const getUserById =gql`
query FindOneBusiness($id: ID) {
    findOneBusiness(_id: $id) {
      name
      address
      category
      image
      email
      phone
    }
  }`
  

export default getUserById;