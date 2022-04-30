import { yupResolver } from '@hookform/resolvers/yup';
import Loading from 'components/common/Loading';
import Modal from 'components/common/Modal';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import facebookIcon from '../../../assets/icon/facebook.svg';
import githubIcon from '../../../assets/icon/github.svg';
import googleIcon from '../../../assets/icon/google.svg';

const schemaValidation = Yup.object({
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
  password: Yup.string().required('Password is required!'),
});

function Login() {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation), mode: 'onChange' });

  return (
    <>
      <div className='auth'>
        <div className='wrapper'>
          <div className='auth-heading'>
            <h3>Sign in</h3>
          </div>
          <form
            onSubmit={handleSubmit(auth.signInWithAccount)}
            autoComplete='off'
            className='auth-form'
          >
            <div className={`auth-form-control ${errors.email ? 'error' : ''}`}>
              <label htmlFor='email'>Email</label>
              <input {...register('email')} id='email' type='text' placeholder='Email' />
              {errors.email && <label className='errors-message'>{errors.email.message}</label>}
            </div>
            <div className={`auth-form-control ${errors.email ? 'error' : ''}`}>
              <label htmlFor='password'>Password</label>
              <input
                {...register('password')}
                id='password'
                type='password'
                placeholder='Password'
              />
              {errors.password && (
                <label className='errors-message'>{errors.password.message}</label>
              )}
            </div>
            <div className='auth-form-submit'>
              <button type='submit'>Sign in </button>
            </div>
          </form>
          <div className='devider'>
            <span>or continue with</span>
          </div>
          <div className='auth-social'>
            <div className='auth-social-item' onClick={() => auth.signInWithSocial(1)}>
              <img src={googleIcon} alt='' />
              <span>Continue with Google</span>
            </div>
            <div className='auth-social-item' onClick={() => auth.signInWithSocial(2)}>
              <img src={facebookIcon} alt='' />
              <span>Continue with Facebook</span>
            </div>
            <div className='auth-social-item' onClick={() => auth.signInWithSocial(3)}>
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
      {auth.isLoading && (
        <Modal isActive={true}>
          <Loading />
        </Modal>
      )}
    </>
  );
}

export default Login;
