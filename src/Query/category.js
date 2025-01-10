import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    category(id: 2) {
      id
      name
      children {
        id
        name
        products {
          items {
            id
            name
            sku
            image {
              url
            }
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
                final_price {
                  value
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;
