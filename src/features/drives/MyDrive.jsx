import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import File from './File';
import Folder from './Folder';
import fakeData from './data.json';

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase/base';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const workspaces = 'Workspaces';
const userId = '0e959136-83b0-4f7b-8ad0-edba52b0b9e4';

const Input = styled('input')({
  display: 'none',
});

const btnStyle = {
  fontSize: '1.5rem',
};

const handleData = (data, path) => {
  const listItem = [];
  const length = path.split('/').length + 1;

  data.map((item) => {
    const file = item.path.startsWith(`${path}/`);
    if (file && item.path.split('/').length === length) listItem.push(item);
  });

  return listItem;
};

function MyDrive() {
  const [pathPrefix, setPathPrefix] = useState(userId);
  const [pathName, setPathName] = useState(workspaces);

  const result = handleData(fakeData, pathPrefix);

  let fileList = [];
  let folderList = [];
  result.map((item) =>
    item.extension === '.folder' ? folderList.push(item) : fileList.push(item)
  );

  const handleClick = () => {
    if (pathName.trim() === workspaces) return;
    setPathName((prev) => prev.split('/').slice(0, -1).join('/'));
    setPathPrefix((prev) => prev.split('/').slice(0, -1).join('/'));
  };

  const param = {
    setPathName,
    setPathPrefix,
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    const storage = getStorage(app);
    const metadata = {
      contentType: 'image/png',
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };
  return (
    <div className='drives__container'>
      <div className='drives__container-header'>
        <div className='drives__title' onClick={() => handleClick()}>
          <ArrowBackIosIcon
            style={{
              fontSize: '2rem',
              marginRight: '1rem',
            }}
          />
          <h3>{pathName}</h3>
        </div>
        <label htmlFor='contained-button-file' onChange={(e) => handleChange(e)}>
          <Input accept='image/*' id='contained-button-file' multiple type='file' />
          <Button style={btnStyle} variant='contained' component='span'>
            Upload
          </Button>
        </label>
      </div>
      <h2 className='drives__heading'>
        <b>Thư mục</b>
        <hr solid='true' />
      </h2>
      <Folder data={folderList} param={param} />
      <h2 className='drives__heading'>
        <b>Tập tin</b>
        <hr solid='true' />
      </h2>
      <File data={fileList} />
    </div>
  );
}

export default MyDrive;
