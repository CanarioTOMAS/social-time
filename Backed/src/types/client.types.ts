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
    id: ID!
  }

  type Query {
    findClient: [Client]
    findOneClient(id: ID!): Client
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
