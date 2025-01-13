import { gql } from "@apollo/client";

export const GET_WISHLIST = gql`
  query GetCustomerWishlist {
    customer {
      wishlist {
        id
        items_count
        items {
          id
          product {
            id
            name
            sku
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                }
              }
            }
            small_image {
              url
            }
          }
        }
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql`
  mutation AddProductToWishlist($sku: String!) {
    addProductsToWishlist(
      wishlistId: "0"
      wishlistItems: [{ sku: $sku, quantity: 1 }]
    ) {
      wishlist {
        id
        items_count
        items {
          id
          product {
            sku
          }
        }
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql`
  mutation RemoveProductsFromWishlist(
    $wishlistId: ID!
    $wishlistItemsIds: [ID!]!
  ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      wishlist {
        id
        items_count
        items {
          id
          product {
            id
            name
          }
        }
      }
    }
  }
`;
