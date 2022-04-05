import { useLazyQuery } from '@apollo/client';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import MyDrive from 'features/drives/MyDrive';
import Repo from 'features/menu/Repo';
import ShareDrive from 'features/menu/ShareDrive';
import SideBar from 'features/menu/SideBar';
import Search from 'features/search/Search';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyFiles } from '../../graphql/Queries';
import ShowToast from '../common/ShowToast';
import { authentication } from '../../app/firebaseConfig';
import { signOut } from 'firebase/auth';
import { authAction } from 'app/authSlice';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState({
    show: false,
    error: false,
    text: '',
  });
  const [contentID, setContentID] = useState(1);
  const userId = useSelector((state) => state.auth.currentUser.id);

  const [getAllFiles] = useLazyQuery(getMyFiles, {
    variables: {
      path: userId + '%',
    },
  });

  return (
    <Box className='layout'>
      <Box className='layout-header'>
        <Search />
        <Button
          variant='contained'
          size='large'
          style={{ marginLeft: '40px', fontSize: '1.2rem' }}
          onClick={() => {
            signOut(authentication)
              .then(() => {
                // Sign-out successful.
                localStorage.removeItem('token');
                dispatch(authAction.logout());
                navigate('/login');
              })
              .catch((error) => {
                // An error happened.
                console.log(error);
              });
          }}
        >
          Sign Out
        </Button>
      </Box>
      <Box className='layout-sidebar'>
        <SideBar setContent={setContentID} />
        {/* SideBar */}
      </Box>
      <Box className='layout-main'>
        {/* <MyDrive setAlert={setAlert} /> */}
        {contentID === 1 && (
          <MyDrive setAlert={setAlert} getFileQueries={getAllFiles} type='files' userId={userId} />
        )}
        {/* {contentID === 1 && <MyDrive setAlert={setAlert} />} */}
        {contentID === 2 && <ShareDrive />}
        {contentID === 3 && <Repo />}
        <ShowToast showToast={alert} />
      </Box>
    </Box>
  );
};

export default Layout;
