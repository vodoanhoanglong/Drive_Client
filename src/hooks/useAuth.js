import { useLazyQuery, useMutation } from '@apollo/client';
import { authentication } from 'app/firebaseConfig';
import { generateDefaultPassword } from 'constants';
import { authAction } from 'features/auth/authSlice';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { CREATE_ACCOUNT, LOGIN } from 'graphql/Mutation';
import { GET_USER_BY_ID } from 'graphql/Queries';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const authContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return React.useContext(authContext);
};
function useAuthProvider() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN);
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [getUserInfo] = useLazyQuery(GET_USER_BY_ID);

  const [isLogged, setIsLogged] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleAuthObserver = React.useRef();
  handleAuthObserver.current = (user) => {
    if (user.providerData[0].providerId !== 'password') {
      // login with social account
      login({
        variables: { email: user.email, password: generateDefaultPassword(user.email) },
        onCompleted: (data) => {
          const { access_token } = data.login;
          const id = jwtDecode(access_token).sub;
          dispatch(
            authAction.login({
              id,
              email: user.email,
              displayName: user.displayName,
              typeofLogin: user.providerData[0].providerId,
            })
          );
          localStorage.setItem('token', access_token);
          setIsLogged(true);
          navigate('/');
          setLoading(false);
        },
      });
    } else {
      //! login with email and password but how to get token? because can save password
      // login({
      //   variables: { email: user.email, password: generateDefaultPassword(user.email) },
      //   onCompleted: (data) => {
      //     console.log('data', data);
      //   },
      // });
    }
  };

  React.useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(authentication, async (user) => {
      if (user) {
        handleAuthObserver.current(user);
      } else {
        setLoading(false);
        setIsLogged(false);
      }
    });
    return () => {
      unregisterAuthObserver();
      localStorage.removeItem('token');
    };
  }, []);

  const signInWithAccount = async ({ email, password }) => {
    console.log('signInWithAccount');
    setLoading(true);
    login({
      variables: { email, password },
      onCompleted: (res) => {
        const { access_token } = res.login;
        localStorage.setItem('token', access_token);
        const id = jwtDecode(access_token).sub;
        getUserInfo({
          variables: { ID: id },
          onCompleted: async (users) => {
            const user = users.account[0];
            try {
              const res = await createUserWithEmailAndPassword(authentication, email, password);
              console.log(res);
              dispatch(
                authAction.login({
                  id,
                  email,
                  displayName: user.fullName,
                  typeofLogin: res.user.providerData[0].providerId,
                })
              );
              setIsLogged(true);
              navigate('/');
              setLoading(false);
            } catch (err) {
              console.log(err.message);
            }
          },
          onError: (err) => {
            console.log('err', err);
            setLoading(false);
          },
        });
      },
      onError: (error) => {
        // Show Notify message error
        console.log('error', error.message);
        setLoading(false);
      },
    });
  };

  const signInWithSocial = async (platformID) => {
    setLoading(true);
    let provider = null;
    switch (platformID) {
      case 1:
        provider = new GoogleAuthProvider();
        break;
      case 2:
        provider = new FacebookAuthProvider();
        break;
      case 3:
        provider = new GithubAuthProvider();
        break;
      default:
        break;
    }
    try {
      const res = await signInWithPopup(authentication, provider);
      login({
        variables: { email: res.user.email, password: generateDefaultPassword(res.user.email) },
        onCompleted: (data) => {
          const { access_token } = data.login;
          const id = jwtDecode(access_token).sub;
          localStorage.setItem('token', access_token);
          dispatch(
            authAction.login({
              id,
              email: res.user.email,
              displayName: res.user.displayName,
              typeofLogin: res.user.providerId,
            })
          );
          setIsLogged(true);
          navigate('/');
          setLoading(false);
        },
        onError: (err) => {
          console.log(err.message);
          createAccount({
            variables: {
              email: res.user.email,
              password: generateDefaultPassword(res.user.email),
              displayName: res.user.displayName,
            },
            onCompleted: (data) => {
              const { id, access_token } = data.createAccount;
              localStorage.setItem('token', access_token);
              dispatch(
                authAction.login({
                  id,
                  email: res.user.email,
                  displayName: res.user.displayName,
                  typeofLogin: res.user.providerId,
                })
              );
              setIsLogged(true);
              navigate('/');
              setLoading(false);
            },
          });
        },
      });
    } catch (err) {
      // * show notification error
      console.log(err.message);
    }
  };

  const signOut = async () => {
    try {
      await authentication.signOut();
      setIsLogged(false);
      localStorage.removeItem('token');
      dispatch(authAction.logout());
    } catch (err) {
      console.log(err.message);
    }
  };

  const signUp = () => {
    console.log('signUp');
  };

  return {
    isLogged,
    loading,
    signInWithAccount,
    signInWithSocial,
    signOut,
    signUp,
  };
}
