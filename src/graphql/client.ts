import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { isProduction } from '../lib/constants';

const link = new HttpLink({
  uri: `${process.env.REACT_APP_API_URI}/graphql`,
  credentials: 'include',
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (!isProduction) {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path, extensions }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Code: ${extensions?.code}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, link]),
  cache: new InMemoryCache().restore((globalThis as any).__APOLLO_STATE__),
});

(globalThis as any).client = client;

export default client;
