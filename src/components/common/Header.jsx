import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/Storage-Logo.png';
export const Header = () => {
  const auth = useAuth();
  const user = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div className='header'>
      <div className='header_logo'>
        <div className='header_logo-img'>
          <img src={logo} alt='' />
        </div>
        <h3>Cloud Storage</h3>
      </div>
      <div className='header_search'>
        <i className='bx bx-search' />
        <input type='text' placeholder='Search...' className='header_search-input' />
        <button className='header_search-filter'>
          <i className='bx bxs-grid'></i>
        </button>
      </div>
      <div className='header_account'>
        <div className='header_account-info'>
          <span>{user.displayName ? user.displayName : 'Khách Hàng'}</span>
        </div>
        <button className='header_account-logout' onClick={() => auth.signOut()}>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};
