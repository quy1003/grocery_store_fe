import { gql } from "@apollo/client";

export const GET_PRODUCT_BY_CATEGORY = gql`
  query GetCategories($categoryId: String!) {
    categories(filters: { ids: { eq: $categoryId } }) {
      items {
        id
        name
        products {
          items {
            id
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
            image {
              url
            }
            sku
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
