import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';
export const ProtectedRoute = () => {
  const auth = useSelector((state) => state.auth);
  if (auth.isLogging && !auth.isLoggedIn) return <Loading />;

  return auth.isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};
