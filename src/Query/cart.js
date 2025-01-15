import { gql } from "@apollo/client";

export const GET_CUSTOMER_CART = gql`
  query GetCustomerCart {
    customerCart {
      id
      items {
        id
        product {
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
            }
          }
        }
        quantity
      }
      prices {
        grand_total {
          value
          currency
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity(
    $cartId: String!
    $cartItemId: Int!
    $quantity: Float!
  ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: [{ cart_item_id: $cartItemId, quantity: $quantity }]
      }
    ) {
      cart {
        items {
          id
          quantity
        }
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($cartId: String!, $cartItemId: Int!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $cartItemId }) {
      cart {
        items {
          id
        }
      }
    }
  }
`;

export const CREATE_CART = gql`
  mutation createEmptyCart {
    createEmptyCart
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation addSimpleProductToCart(
    $cartId: String!
    $sku: String!
    $quantity: Float!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
      }
    ) {
      cart {
        id
        items {
          id
          product {
            name
            sku
          }
          quantity
        }
      }
    }
  }
`;
