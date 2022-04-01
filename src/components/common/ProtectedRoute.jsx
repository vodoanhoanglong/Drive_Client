import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const auth = () => {
  const user = { isLoggedIn: true };
  return user && user.isLoggedIn;
};

export const ProtectedRoute = () => {
  const isAuth = auth();
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};
