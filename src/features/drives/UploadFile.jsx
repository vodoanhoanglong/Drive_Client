import React from 'react';
import styled from '@emotion/styled';

import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../app/firebaseConfig';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { uploadFile, updateFileUrl } from '../../graphql/Mutation';

const Input = styled('input')({
  display: 'none',
});

const btnStyle = {
  fontSize: '1.5rem',
};

const handleChange = async (
  e,
  pathPrefix,
  addFile,
  updateUrl,
  setAllData,
  setProgress,
  progressRef
) => {
  const file = e.target.files[0];
  const metadata = {
    contentType: file.type,
  };

  let extension = `.${file.type.split('/')[1]}`;

  switch (extension) {
    case '.vnd.ms-excel':
    case '.vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      extension = '.xlsx';
      break;
    case '.plain':
      extension = '.txt';
      break;
    case '.vnd.openxmlformats-officedocument.wordprocessingml.document':
      extension = '.docx';
      break;
    case '.vnd.openxmlformats-officedocument.presentationml.presentation':
      extension = '.ppt';
      break;
    default:
      break;
  }

  const name = file.name.split('.').slice(0, -1).join('.');
  let returningData = '';
  await addFile({
    variables: {
      name,
      path: pathPrefix,
      url: '',
      size: file.size,
      extension,
    },
    onCompleted: (data) => (returningData = data),
    onError: (error) => console.log(`uploadFile error: ${error}`),
  });

  const storageRef = ref(storage, `${pathPrefix}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  await uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
      progressRef.current.style.display = 'block';
      // eslint-disable-next-line default-case
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
      // eslint-disable-next-line default-case
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;

        case 'storage/unknown':
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
        await updateUrl({
          variables: { id: returningData.uploadFile.id, url: downloadURL },
          onCompleted: (data) => {
            setAllData((prevData) => [...prevData, data.update_files_by_pk]);
          },
        });
        progressRef.current.style.display = 'none';
      });
    }
  );
};

function UploadFile({ pathPrefix, setAllData, setProgress, progressRef }) {
  const [addFile] = useMutation(uploadFile);
  const [updateUrl] = useMutation(updateFileUrl);
  return (
    <>
      <label
        htmlFor='contained-button-file'
        onChange={(e) =>
          handleChange(e, pathPrefix, addFile, updateUrl, setAllData, setProgress, progressRef)
        }
      >
        <Input accept='*' id='contained-button-file' multiple type='file' />
        <Button style={btnStyle} variant='contained' component='span'>
          Upload
        </Button>
      </label>
    </>
  );
}

export default UploadFile;
