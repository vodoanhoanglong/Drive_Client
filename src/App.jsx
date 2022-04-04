import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import { NotFound, ProtectedRoute } from './components/common';
import Layout from './components/layout';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Search_filter from './features/filter_search/Search-filter';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
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
        <Route path='/dashboard' element={<Search_filter />} />
        <Route path='/' element={<Navigate to='/drive' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/drive/*' element={<Layout />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
