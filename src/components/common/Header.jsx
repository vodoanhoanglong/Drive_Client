import React from 'react';
import logo from '../../assets/images/Storage-Logo.png';
export const Header = () => {
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
          <i class='bx bxs-grid'></i>
        </button>
      </div>
      <div className='header_account'>
        <div className='header_account-info'>
          <spam>UserName</spam>
        </div>
        <button className='header_account-logout'>Đăng xuất</button>
      </div>
    </div>
  );
};
