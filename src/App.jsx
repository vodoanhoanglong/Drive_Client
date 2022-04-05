import { useLazyQuery, useMutation } from '@apollo/client';
import { authAction } from 'app/authSlice';
import { authentication } from 'app/firebaseConfig';
import { generateDefaultPassword } from 'constants';
import { onAuthStateChanged } from 'firebase/auth';
import { LOGIN_BY_ACCOUNT } from 'graphql/Mutation';
import { GET_USER_BY_EMAIL } from 'graphql/Queries';
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
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL, {
    onCompleted: (data) => {
      dispatch(authAction.loginSuccess(data.account[0]));
      navigate('/drive');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleAuthStateChanged = useRef();
  handleAuthStateChanged.current = (userEmail) => {
    loginByAccount({
      variables: { email: userEmail, password: generateDefaultPassword(userEmail) },
      onCompleted: (data) => {
        const { access_token } = data.login;
        localStorage.setItem('token', access_token);
        getUserByEmail({ variables: { email: userEmail } });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(authentication, (user) => {
      if (user) {
        handleAuthStateChanged.current(user.email);
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
