import React from 'react';
import { Navigate } from 'react-router-dom';

const auth = () => {
  const user = { isLoggedIn: false };
  return user && user.isLoggedIn;
};

export const ProtectedRoute = () => {
  const isAuth = auth();
  return isAuth ? <Navigate to='/drive' /> : <Navigate to='/login' />;
};
