import { gql } from "apollo-server-express";

module.exports = gql`
  type Client {
    business: Business
    name: String!
    image: String
    city: String
    address: String
    email: String!
    phone: String
    postCode: String
    documentType: String
    documentNumber: String
    surname: String
    deleted: Boolean
    project (idProject: ID): [Project]
    id: ID!
  }

  type Mutation {
    createClient(
      business: String!
      name: String!
      image: String
      city: String
      address: String
      email: String!
      phone: String
      postCode: String
      documentType: String
      documentNumber: String
      surname: String
      project: String
    ): Client
    updateClient(
      _id: String!
      name: String!
      image: String
      city: String
      address: String
      email: String!
      phone: String
      postCode: String
      documentType: String
      documentNumber: String
      surname: String
    ): Client
    deleteClient(_id: String!): String
  }
`;
