import { useLazyQuery } from '@apollo/client';
import styled from '@emotion/styled';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getMyFiles } from 'graphql/Queries';
import React, { useEffect, useState } from 'react';
import { app } from '../../firebase/base';
import File from './File';
import Folder from './Folder';

const workspaces = 'Workspaces';
const userId = '4b98a8b5-3517-4948-b6af-e46762af9d3e';

const Input = styled('input')({
  display: 'none',
});

const btnStyle = {
  fontSize: '1.5rem',
};

const handleData = (data, path) => {
  // const listItem = [];
  const length = path.split('/').length + 1;

  const listItem = data.map((item) => {
    const file = item.path.startsWith(`${path}/`);
    return file && item.path.split('/').length === length;
  });

  return listItem;
};

function MyDrive() {
  const [pathPrefix, setPathPrefix] = useState(userId);
  const [pathName, setPathName] = useState(workspaces);
  const [allData, setAllData] = useState([]);

  const [getAllFiles, { data }] = useLazyQuery(getMyFiles, {
    variables: {
      path: userId + '%',
    },
  });

  useEffect(() => {
    getAllFiles();
    if (data) setAllData(data.files);
  }, [data, getAllFiles]);

  const result = handleData(allData, pathPrefix);

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
          default:
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
          default:
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
