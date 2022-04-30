import { Helmet } from 'components/common';
import React from 'react';
import File from '../components/File';
import Folder from '../components/Folder';

const MyDrive = () => {
  return (
    <Helmet title='Kho Của Tôi'>
      <div className='drive'>
        {/** Header */}
        <div className='drive_header'>
          <div className='drive_header_path'>
            <h4 className='drive_header_path-item'>{'Kho của tôi'}</h4>
            {/* <i className='bx bx-chevron-right' />
          <span className='drive_header_path-item'>{'ClassRoom'}</span> */}
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
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
              <Folder />
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
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
              <File />
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

export default MyDrive;
