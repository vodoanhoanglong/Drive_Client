import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import File from './File';
import Folder from './Folder';
import fakeData from './data.json';

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
  const userId = '0e959136-83b0-4f7b-8ad0-edba52b0b9e4';

  const [pathPrefix, setPathPrefix] = useState(userId);
  const [pathName, setPathName] = useState('Workspace');

  const result = handleData(fakeData, pathPrefix);

  console.log(result);
  let fileList = [];
  let folderList = [];
  result.map((item) =>
    item.extension === '.folder' ? folderList.push(item) : fileList.push(item)
  );

  const handleClick = () => {
    console.log('jssjs');
    setPathName((prev) => prev.split('/').slice(0, -1).join('/'));
    setPathPrefix((prev) => prev.split('/').slice(0, -1).join('/'));
  };

  const param = {
    setPathName,
    setPathPrefix,
  };

  return (
    <div className='drives__container'>
      <div className='drives__title' onClick={() => handleClick()}>
        <ArrowBackIosIcon
          style={{
            fontSize: '2rem',
            marginRight: '1rem',
          }}
        />
        <h3>{pathName}</h3>
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
