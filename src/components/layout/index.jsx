import { Box } from '@mui/system';
import MyDrive from 'features/drives/MyDrive';
import Search from 'features/search/Search';
import React, { useState } from 'react';
import ShowToast from '../common/ShowToast';
import SideBar from 'features/menu/SideBar';
import { AppBar, Divider, Toolbar, Typography } from '@mui/material';
import ShareDrive from 'features/menu/ShareDrive';
import Repo from 'features/menu/Repo';
const Layout = () => {
  const [alert, setAlert] = useState({
    show: false,
    error: false,
    text: '',
  });
  const [contentID, setContentID] = useState(1);

  return (
    <Box className='layout'>
      <Box className='layout-header'>
        <Search />
      </Box>
      <Box className='layout-sidebar'>
        <SideBar setContent={setContentID} />
        {/* SideBar */}
      </Box>
      <Box className='layout-main'>
        {/* <MyDrive setAlert={setAlert} /> */}
        {contentID === 1 && <MyDrive setAlert={setAlert} />}
        {contentID === 2 && <ShareDrive />}
        {contentID === 3 && <Repo />}
        <ShowToast showToast={alert} />
      </Box>
    </Box>

    // <div>

    // </div>
  );
};

export default Layout;
