import { useLazyQuery, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { authentication } from 'app/firebaseConfig';
import { generateDefaultPassword } from 'constants';
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { CREATE_ACCOUNT, LOGIN_BY_ACCOUNT } from 'graphql/Mutation';
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from 'graphql/Queries';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authAction } from '../authSlice';
import facebookIcon from '../../../assets/icon/facebook.svg';
import googleIcon from '../../../assets/icon/google.svg';
import githubIcon from '../../../assets/icon/github.svg';

const schemaValidation = Yup.object({
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createAccount] = useMutation(CREATE_ACCOUNT);
  const [loginByAccount] = useMutation(LOGIN_BY_ACCOUNT);
  const [getUserByEmail] = useLazyQuery(GET_USER_BY_EMAIL);
  const [getUserByID] = useLazyQuery(GET_USER_BY_ID, {
    onCompleted: (data) => {
      dispatch(authAction.loginSuccess(data.account[0]));
      navigate('/drive');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation), mode: 'onChange' });

  const handleLoginWithSocial = (id) => {
    dispatch(authAction.login());
    let provider = null;
    switch (id) {
      case 1: //* google login
        provider = new GoogleAuthProvider();
        break;
      case 2: //* facebook login
        provider = new FacebookAuthProvider();
        break;
      case 3: //* github login
        provider = new GithubAuthProvider();
        break;
      default:
        break;
    }

    signInWithPopup(authentication, provider)
      .then((res) => {
        const user = {
          email: res.user.email,
          password: generateDefaultPassword(res.user.email),
          displayName: res.user.displayName,
        };

        createAccount({
          variables: { ...user },
          onCompleted: async (data) => {
            const { id, access_token } = data.createAccount;
            console.log(access_token);
            localStorage.setItem('token', access_token);
            await getUserByID({ variables: { ID: id } });
          },
          onError: (error) => {
            loginByAccount({
              variables: { email: user.email, password: user.password },
              onCompleted: async (data) => {
                const { access_token } = data.login;
                localStorage.setItem('token', access_token);
                await getUserByEmail({ variables: { email: user.email } });
              },
              onError: (error) => {
                console.error(error);
              },
            });
          },
        });
      })
      .catch((err) => {
        dispatch(authAction.loginFailure());
        console.error(err.message);
      });
  };

  const handleLogin = (values) => {
    dispatch(authAction.login());
    loginByAccount({
      variables: { email: values.email, password: values.password },
      onCompleted: (data) => {
        const { access_token } = data.login;
        localStorage.setItem('token', access_token);
        getUserByEmail({
          variables: { email: values.email },
          onCompleted: (data) => {
            dispatch(authAction.loginSuccess(data.account[0]));
            navigate('/drive');
          },
        });
      },
      onError: (error) => {
        dispatch(authAction.loginFailure());
        console.error(error);
      },
    });
  };

  return (
    <div className='auth'>
      <div className='wrapper'>
        <div className='auth-heading'>
          <h3>Sign in</h3>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} autoComplete='off' className='auth-form'>
          <div className={`auth-form-control ${errors.email ? 'error' : ''}`}>
            <label htmlFor='email'>Email</label>
            <input {...register('email')} id='email' type='text' placeholder='Email' />
            {errors.email && <label className='errors-message'>{errors.email.message}</label>}
          </div>
          <div className={`auth-form-control ${errors.email ? 'error' : ''}`}>
            <label htmlFor='password'>Password</label>
            <input {...register('password')} id='password' type='password' placeholder='Password' />
            {errors.password && <label className='errors-message'>{errors.password.message}</label>}
          </div>
          <div className='auth-form-submit'>
            <button type='submit'>Sign in </button>
          </div>
        </form>
        <div className='devider'>
          <span>or continue with</span>
        </div>
        <div className='auth-social'>
          <div className='auth-social-item' onClick={() => handleLoginWithSocial(1)}>
            <img src={googleIcon} alt='' />
            <span>Continue with Google</span>
          </div>
          <div className='auth-social-item' onClick={() => handleLoginWithSocial(2)}>
            <img src={facebookIcon} alt='' />
            <span>Continue with Facebook</span>
          </div>
          <div className='auth-social-item' onClick={() => handleLoginWithSocial(3)}>
            <img src={githubIcon} alt='' />
            <span>Continue with Github</span>
          </div>
        </div>
        <div className='auth-footer'>
          <span>Don't have an account? </span>
          <Link to='/register' className='auth-footer-link'>
            Register for free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
