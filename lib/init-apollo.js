import { ApolloClient, ApolloLink, InMemoryCache } from 'apollo-boost'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { createPersistedQueryLink } from 'apollo-link-persisted-queries'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  const cache = new InMemoryCache().restore(initialState || {})

  const errorHandler = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location:` +
          JSON.stringify(locations) +
          `, Path: ${path}`
        )
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  const httpLink = () =>
    createPersistedQueryLink().concat(
      createHttpLink({
        uri: `https://zg80igcjwc.execute-api.us-east-1.amazonaws.com/dev/graphqlgg`,
        //uri: `http://localhost:4000/graphqlgg`,
      })
    )

  const link = ApolloLink.from([errorHandler, httpLink()])

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache
  })
}

export default function initApollo (initialState) {
  if (!process.browser) {
    return create(initialState)
  }

  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
