import React from 'react';
import pptIcon from '../../../assets/icon/ppt.svg';
const File = () => {
  return (
    <div className='file'>
      <div className='file_cover'>
        <img src={pptIcon} alt='' />
      </div>
      <div className='file_info'>
        <div className='file_info_name'>
          <i className='bx bx-file-blank'></i>
          <span>{'File Name.ppt'}</span>
        </div>
        <div className='file_info-tool'>
          <button className='file_info_tool_button'>
            <i className='bx bxs-trash-alt' />
          </button>
          <button className='file_info_tool_button'>
            <i className='bx bxs-share' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default File;
