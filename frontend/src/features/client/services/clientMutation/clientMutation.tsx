import { gql } from "@apollo/client";

const CreateClient = gql`
  mutation Mutation(
    $business: String!
    $name: String!
    $email: String!
    $city: String
    $image: String
    $address: String
    $phone: String
    $postCode: String
    $documentType: String
    $documentNumber: String
    $surname: String
  ) {
    createClient(
      business: $business
      name: $name
      email: $email
      city: $city
      image: $image
      address: $address
      phone: $phone
      postCode: $postCode
      documentType: $documentType
      documentNumber: $documentNumber
      surname: $surname
    ) {
      business {
        _id
      }
      address
      city
      deleted
      documentNumber
      documentType
      email
      id
      image
      name
      phone
      postCode
      surname
    }
  }
`;

const UpdateClient = gql`
  mutation UpdateClient(
    $id: String!
    $name: String!
    $email: String!
    $image: String
    $city: String
    $address: String
    $phone: String
    $postCode: String
    $documentType: String
    $documentNumber: String
    $surname: String
  ) {
    updateClient(
      _id: $id
      name: $name
      email: $email
      image: $image
      city: $city
      address: $address
      phone: $phone
      postCode: $postCode
      documentType: $documentType
      documentNumber: $documentNumber
      surname: $surname
    ) {
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
      id
    }
  }
`;

const DeleteClient = gql`
  mutation UpdateClient($id: String!) {
    deleteClient(_id: $id)
  }
`;

export const ClientMutationServices = {
  CreateClient,
  UpdateClient,
  DeleteClient,
};
