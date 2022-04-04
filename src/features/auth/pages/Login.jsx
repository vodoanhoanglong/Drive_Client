import React from 'react';
import googleIcon from '../../../assets/images/login/google.svg';
import facebookIcon from '../../../assets/images/login/facebook.svg';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div className='auth'>
      <div className='container'>
        <div className='auth-heading'>
          <h3>Sign in</h3>
        </div>
        <form autoComplete='off' className='auth-form'>
          <div className='auth-form-control'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' placeholder='Email' />
          </div>
          <div className='auth-form-control'>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' placeholder='Password' />
          </div>
          <div className='auth-form-submit'>
            <button type='submit'>Sign in </button>
          </div>
        </form>
        <div className='devider'>
          <span>or continue with</span>
        </div>
        <div className='auth-social'>
          <div className='auth-social-item'>
            <img src={googleIcon} alt='' />
            <span>Continue with Google</span>
          </div>
          <div className='auth-social-item'>
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
