import { useLazyQuery } from '@apollo/client';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import File from './File';
import Folder from './Folder';
import UploadFile from './UploadFile';

import { getMyFiles } from 'graphql/Queries';
import CreateFolder from './CreateFolder';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const workspaces = 'Workspaces';

const styleProgress = {
  position: 'absolute',
  top: '-5%',
  display: 'none',
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

function MyDrive({ setAlert }) {
  const userId = useSelector((state) => state.auth.currentUser.id);
  const [pathPrefix, setPathPrefix] = useState(userId);
  const [pathName, setPathName] = useState(workspaces);
  const [progress, setProgress] = useState(0);
  const [allData, setAllData] = useState([]);
  const progressRef = React.useRef(null);

  const [getAllFiles] = useLazyQuery(getMyFiles, {
    variables: {
      path: userId + '%',
    },
  });

  // fetch data
  useEffect(() => {
    getAllFiles({
      onCompleted: (data) => {
        setAllData(data.files);
      },
    });
  }, [allData, getAllFiles]);

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
      <Box sx={{ width: '100%' }} ref={progressRef} style={styleProgress}>
        <LinearProgress variant='determinate' value={progress} />
      </Box>
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
        <div style={{ display: 'flex' }}>
          <UploadFile
            pathPrefix={pathPrefix}
            setAllData={setAllData}
            setProgress={setProgress}
            progressRef={progressRef}
          />
          <CreateFolder setAllData={setAllData} pathPrefix={pathPrefix} setAlert={setAlert} />
        </div>
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
      <File data={fileList} pathPrefix={pathPrefix} setAllData={setAllData} />
    </div>
  );
}

export default MyDrive;
