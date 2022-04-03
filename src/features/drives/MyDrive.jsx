import React, { useEffect, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import File from './File';
import Folder from './Folder';
import UploadFile from './UploadFile';
import fakeData from './data.json';

import { useLazyQuery } from '@apollo/client';
import { getMyFiles } from 'graphql/Queries';

const workspaces = 'Workspaces';
const userId = '4b98a8b5-3517-4948-b6af-e46762af9d3e';

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
        <UploadFile pathPrefix={pathPrefix} userId={userId} />
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
