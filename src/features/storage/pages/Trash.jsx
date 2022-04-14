import { Helmet } from 'components/common';
import React from 'react';
import File from '../components/File';
import Folder from '../components/Folder';

const Trash = () => {
  return (
    <Helmet title='Thùng rác'>
      <div className='drive'>
        {/** Header */}
        <div className='drive_header'>
          <div className='drive_header_path'>
            <h4 className='drive_header_path-item'>{'Thùng rác'}</h4>
          </div>
        </div>
        {/** End Header */}
        <div className='drive_content'>
          {/* Folder */}
          <div className='drive_content_list'>
            <div className='drive_content_list-title'>
              <h4>Thư mục</h4>
            </div>
            <div className='drive_content_list-item'>
              <Folder />
            </div>
          </div>
          {/* File */}
          <div className='drive_content_list'>
            <div className='drive_content_list-title'>
              <h4>Tệp</h4>
            </div>
            <div className='drive_content_list-item'>
              <File />
              <File />
            </div>
          </div>
        </div>
        {/** End Content */}
      </div>
    </Helmet>
  );
};

export default Trash;
