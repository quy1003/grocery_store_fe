import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://magento.quythanh.tk/graphql",
  cache: new InMemoryCache(),
});

export default client;
