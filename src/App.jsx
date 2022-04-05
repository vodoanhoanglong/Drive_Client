import { useMutation } from '@apollo/client';
import { authAction } from 'app/authSlice';
import { authentication } from 'app/firebaseConfig';
import { generateDefaultPassword } from 'constants';
import { onAuthStateChanged } from 'firebase/auth';
import { LOGIN_BY_ACCOUNT } from 'graphql/Mutation';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes as Switch, useNavigate } from 'react-router-dom';
import { NotFound, ProtectedRoute } from './components/common';
import Layout from './components/layout';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import SideBar from './features/menu/SideBar';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginByAccount] = useMutation(LOGIN_BY_ACCOUNT);
  const handleAuthStateChanged = useRef();
  handleAuthStateChanged.current = (user) => {
    loginByAccount({
      variables: { email: user.email, password: generateDefaultPassword(user.email) },
      onCompleted: (data) => {
        const { access_token } = data.login;
        localStorage.setItem('token', access_token);
        dispatch(authAction.loginSuccess(user));
        navigate('/drive');
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(authentication, (user) => {
      if (user) {
        handleAuthStateChanged.current({
          email: user.email,
          displayName: user.displayName,
        });
      }
    });
    return () => {
      unregisterAuthObserver();
      localStorage.removeItem('token');
    };
  }, []);

  return (
    <Switch>
      {/* <Route path='/dashboard' element={<Search_filter />} /> */}
      <Route path='/' element={<Navigate to='/drive' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/menu' element={<SideBar />} />

      <Route element={<ProtectedRoute />}>
        <Route path='/drive/*' element={<Layout />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Switch>
  );
}

export default App;
