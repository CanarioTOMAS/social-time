import { gql } from "apollo-server-express";

module.exports = gql`
  type Business {
    user: User
    name: String
    address: String
    category: String
    email: String
    image: String
    phone: String
    _id: ID!
    client (idClient: ID): [Client]
  }

  type Query {
    findUserBusiness(_id: ID, pageCount: Int, perPage: Int, searchWord: String): [Business],
    findOneBusiness(_id: ID, user:String, name: String): Business,
    
  }

  type Mutation {
    addBusiness(
      user: String
      name: String!
      address: String
      category: String
      email: String
      image: String
      phone: String
    ): Business
    updateBusiness(
      _id: String!
      name: String
      address: String
      category: String
      email: String
      image: String
      phone: String
    ): Business
    deleteBusiness(
      _id: String!
    ): String
    addUserToBusiness(
      idBusiness: String!
      idUser: String!
      roltype: String
    ): String
  }
`;
