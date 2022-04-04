import { useLazyQuery, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { authentication } from 'app/firebaseConfig';
import { generateDefaultPassword } from 'constants';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CREATE_ACCOUNT, LOGIN_BY_ACCOUNT } from 'graphql/Mutation';
import { GET_USER_BY_EMAIL, GET_USER_BY_ID } from 'graphql/Queries';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authAction } from '../../../app/authSlice';
import facebookIcon from '../../../assets/images/login/facebook.svg';
import googleIcon from '../../../assets/images/login/google.svg';

const schemaValidation = Yup.object({
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createAccount] = useMutation(CREATE_ACCOUNT);
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

  const handleLoginWithSocial = (platform) => {
    dispatch(authAction.login());
    const provider = platform === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        const user = {
          email: res.user.email,
          password: generateDefaultPassword(res.user.email),
          displayName: res.user.displayName,
        };
        createAccount({
          variables: { ...user },
          onCompleted: (data) => {
            const { id, access_token } = data.createAccount;
            localStorage.setItem('token', access_token);
            getUserByID({ variables: { ID: id } });
          },
          onError: (error) => {
            loginByAccount({
              variables: { email: user.email, password: user.password },
              onCompleted: (data) => {
                const { access_token } = data.login;
                localStorage.setItem('token', access_token);
                getUserByEmail({ variables: { email: user.email } });
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
        getUserByEmail({ variables: { email: values.email } });
      },
      onError: (error) => {
        dispatch(authAction.loginFailure());
        console.error(error);
      },
    });
  };

  return (
    <div className='container'>
      <div className='auth'>
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
          <div className='auth-social-item' onClick={() => handleLoginWithSocial('google')}>
            <img src={googleIcon} alt='' />
            <span>Continue with Google</span>
          </div>
          <div className='auth-social-item' onClick={() => handleLoginWithSocial()}>
            <img src={facebookIcon} alt='' />
            <span>Continue with Facebook</span>
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
