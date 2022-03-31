import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Route, Routes as Switch } from "react-router-dom";

// components
import LoginPage from "./features/auth/LoginPage";
import MyDrive from "./features/drives/MyDrive";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/v1/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MyDrive />} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
