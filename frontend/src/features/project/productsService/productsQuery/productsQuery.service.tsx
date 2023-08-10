import { gql } from "@apollo/client";

const products = gql`
  query Products {
    findUserBusiness {
      products {
        id
        name
        description
        codigo
        costPrice
        salePrice
        image
      }
    }
  }
`;

export const ProductsQueryService = {
  products,
};
