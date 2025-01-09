// graphql/mutations.js
import { gql } from "graphql-tag";

export const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomerV2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        id
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`;
