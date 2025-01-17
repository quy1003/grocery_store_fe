import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GRAPHQL_URL } from "@env";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

export const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  const tokenObject = JSON.parse(token);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${tokenObject.token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
