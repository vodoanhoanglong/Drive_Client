import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
export const ProtectedRoute = () => {
  // const auth = useSelector((state) => state.auth);
  // if (auth.isLogging && !auth.isLoggedIn) return <Loading />;
  const auth = true;
  return auth ? <Outlet /> : <Navigate to='/login' />;
};
