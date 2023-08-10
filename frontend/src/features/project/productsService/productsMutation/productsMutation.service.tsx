import { gql } from "@apollo/client";

const AddProduct = gql`
  mutation CreateProduct(
    $business: String!
    $name: String!
    $description: String
    $codigo: String
    $costPrice: String
    $salePrice: String
    $image: String
  ) {
    createProduct(
      business: $business
      name: $name
      description: $description
      codigo: $codigo
      costPrice: $costPrice
      salePrice: $salePrice
      image: $image
    ) {
      id
    }
  }
`;

const UpdateProduct = gql`
  mutation UpdateProduct(
    $id: String!
    $name: String
    $description: String
    $codigo: String
    $costPrice: String
    $salePrice: String
    $image: String
  ) {
    updateProduct(
      _id: $id
      name: $name
      description: $description
      codigo: $codigo
      costPrice: $costPrice
      salePrice: $salePrice
      image: $image
    ) {
      id
      salePrice
      costPrice
      codigo
      description
      name
      image
    }
  }
`;

const DeleteProducts = gql`
  mutation UpdateProduct($id: String!) {
    deleteProduct(_id: $id)
  }
`;

export const ProductMutationServices = {
  AddProduct,
  UpdateProduct,
  DeleteProducts,
};
