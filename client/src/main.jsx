import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { ClientProfileDetails } from "./routes/ClientDetails";
import ClientDataTable from "./components/ClientDataTable";
import { Provider } from "./context/clients";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   uri: '/graphql',
// });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

// const client = new ApolloClient({
//   // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: "./graphql", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "clients/details/:id",
        element: <ClientProfileDetails />,
        loader: ({ params }) => {
          return { id: params.id };
        },
      },
      {
        path: "clients",
        element: <ClientDataTable />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-za4id1uxfphft08n.us.auth0.com"
    clientId="uQ2crUwjk6sKYRLgrvfVw8VGVGhetdmo"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ApolloProvider client={client}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </Auth0Provider>
);
