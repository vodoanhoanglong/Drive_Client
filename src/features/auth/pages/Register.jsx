import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='auth'>
      <div className='container'>
        <div className='auth-heading'>
          <h3>Sign up</h3>
        </div>
        <form autoComplete='off' className='auth-form'>
          <div className='auth-form-control'>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' placeholder='Username' />
          </div>
          <div className='auth-form-control'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' placeholder='Email' />
          </div>
          <div className='auth-form-control'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' placeholder='Password' />
          </div>
          <div className='auth-form-submit'>
            <button type='submit'>Sign up </button>
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
