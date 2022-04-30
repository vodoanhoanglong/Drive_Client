import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from 'hooks/useAuth';
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
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation), mode: 'onChange' });

  // const handleRegister = (data) => {
  //   createAccount({
  //     variables: { email: data.email, password: data.password, displayName: data.username },
  //     onCompleted: (data) => {
  //       const { id, access_token } = data.createAccount;
  //       localStorage.setItem('token', access_token);
  //       getUserByID({ variables: { ID: id } });
  //     },
  //   });
  // };

  return (
    <div className='auth'>
      <div className='wrapper'>
        <div className='auth-heading'>
          <h3>Sign up</h3>
        </div>
        <form autoComplete='off' className='auth-form' onSubmit={handleSubmit(auth.signUp)}>
          <div className={`auth-form-control ${errors.username ? 'error' : ''}`}>
            <label htmlFor='username'>Username</label>
            <input {...register('username')} id='username' type='text' placeholder='Username' />
            {errors.username && <label className='errors-message'>{errors.username.message}</label>}
          </div>
          <div className={`auth-form-control ${errors.email ? 'error' : ''}`}>
            <label htmlFor='email'>Email</label>
            <input {...register('email')} id='email' type='text' placeholder='Email' />
            {errors.email && <label className='errors-message'>{errors.email.message}</label>}
          </div>
          <div className={`auth-form-control ${errors.password ? 'error' : ''}`}>
            <label htmlFor='password'>Password</label>
            <input {...register('password')} id='password' type='password' placeholder='Password' />
            {errors.password && <label className='errors-message'>{errors.password.message}</label>}
          </div>
          <div className={`auth-form-control ${errors.repassword ? 'error' : ''}`}>
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
