import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_CATEGORY = gql`
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

export const GET_PRODUCT_BY_SKU = gql`
  query GetProductBySku($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        sku
        name
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
        small_image {
          url
          label
        }
        media_gallery {
          url
          label
        }
        stock_status
        categories {
          id
          name
        }
        rating_summary
        reviews {
          items {
            nickname
            summary
            text
            created_at
            ratings_breakdown {
              name
              value
            }
          }
        }
      }
    }
  }
`;
