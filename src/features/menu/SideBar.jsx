import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import GroupIcon from '@mui/icons-material/Group';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import MyDrive from './MyDrive';
import Repo from './Repo';
import ShareDrive from './ShareDrive';

const drawerWidth = 240;

const fakeData = [
  {
    id: 1,
    text: 'Drive của tôi',
  },
  {
    id: 2,
    text: 'Được chia sẽ với tôi',
  },
  {
    id: 3,
    text: 'Thùng rác ',
  },
];
export default function PermanentDrawerLeft() {
  const [state, setstate] = useState('');

  const handleClick = (value, e) => {
    switch (value.id) {
      case 1:
        setstate('drive');
        break;
      case 2:
        setstate('share');
        break;
      case 3:
        setstate('repo');
        break;
      default:
        break;
    }
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <List>
          {fakeData.map((value, index) => (
            <ListItem button onClick={(e) => handleClick(value, e)} key={value.id}>
              <ListItemIcon>{index % 2 === 0 ? <AddToDriveIcon /> : <GroupIcon />}</ListItemIcon>
              <ListItemText primary={value.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />

        {state === 'drive' && <MyDrive />}
        {state === 'share' && <ShareDrive />}
        {state === 'repo' && <Repo />}
      </Box>
    </Box>
  );
}
