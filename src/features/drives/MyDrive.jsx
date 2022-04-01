import React from 'react';
import File from './File';
import Folder from './Folder';
import data from './data.json';

const handleData = (data) => {
  return data.filter((item) => item.path.split('/').length === 2);
};

function MyDrive() {
  const result = handleData(data);
  let fileList = [];
  let folderList = [];
  result.map((item) =>
    item.extension === '.folder' ? folderList.push(item) : fileList.push(item)
  );

  return (
    <div className='drives__container'>
      <h2 className='drives__heading'>
        <b>Thư mục</b>
        <hr solid='true' />
      </h2>
      <Folder data={folderList} />
      <h2 className='drives__heading'>
        <b>Tập tin</b>
        <hr solid='true' />
      </h2>
      <File data={fileList} />
    </div>
  );
}

export default MyDrive;
