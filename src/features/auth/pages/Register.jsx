import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_ACCOUNT } from 'graphql/Mutation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

const schemaValidation = Yup.object({
  username: Yup.string().required('Username is required!'),
  email: Yup.string().email('Invalid Email!').required('Email is required!'),
  password: Yup.string().required('Password is required!'),
  repassword: Yup.string()
    .required('Confirm Password is required!')
    .oneOf([Yup.ref('password'), null], 'Passwords must match!'),
});

function Register() {
  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    onCompleted: (data) => {
      console.log(data.createAccount);
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

  const handleRegister = (data) => {
    createAccount({
      variables: { email: data.email, password: data.password, displayName: data.username },
    });
  };

  return (
    <div className='container'>
      <div className='auth'>
        <div className='auth-heading'>
          <h3>Sign up</h3>
        </div>
        <form autoComplete='off' className='auth-form' onSubmit={handleSubmit(handleRegister)}>
          <div className={`auth-form-control ${errors.email ? 'error' : ''}`}>
            <label htmlFor='username'>Username</label>
            <input {...register('username')} id='username' type='text' placeholder='Username' />
            {errors.username && <label className='errors-message'>{errors.username.message}</label>}
          </div>
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
          <div className={`auth-form-control ${errors.email ? 'error' : ''}`}>
            <label htmlFor='repassword'>Confirm Password</label>
            <input
              {...register('repassword')}
              id='repassword'
              type='password'
              placeholder='Confirm Password'
            />
            {errors.repassword && (
              <label className='errors-message'>{errors.repassword.message}</label>
            )}
          </div>
          <div className='auth-form-submit'>
            <button type='submit'>Sign up</button>
          </div>
        </form>
        <div className='auth-footer'>
          <span>Already have an account? </span>
          <Link to='/login' className='auth-footer-link'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
