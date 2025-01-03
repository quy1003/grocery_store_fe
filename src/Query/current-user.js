import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  {
  customer {
    id
    firstname
    lastname
    email
    # gender // optional
    is_subscribed
  }
}
`;
