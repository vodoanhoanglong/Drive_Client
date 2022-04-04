import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Register from './features/auth/pages/Register';
import React from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import { NotFound, ProtectedRoute } from './components/common';
import Layout from './components/layout';
import Login from './features/auth/pages/Login';
import SideBar from './features/menu/SideBar';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const tempToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL25leGxhYi50ZWNoIiwic3ViIjoiNGI5OGE4YjUtMzUxNy00OTQ4LWI2YWYtZTQ2NzYyYWY5ZDNlIiwiYXVkIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDQ4MDU1LCJuYnQiOjE2NDg5NjE2NTUsImlhdCI6MTY0ODk2MTY1NSwianRpIjoiZDAyN2ZjMmMtZTVjNi00NGFmLTk5ZjgtODg2OGQyMWZhM2QwIiwicmRoIjoiSkRKaEpERXdKRWR2WkZGbVRYVnJhRWswWW05blZHYzRVRmxGYWs5UlVVNDJiWEpqV0RWNGFXcHZiRFJPV1dOT1VYQjFMM1ZDV0hacGFXZzIifQ.sxBOQDKCHqVBzL9r4oFLkhxQY8OuWoVmTzVlsyUccG0';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token') || tempToken;
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
        <Route path='/' element={<Navigate to='/drive' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/menu' element={<SideBar />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/drive/*' element={<Layout />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
