import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import GroupIcon from '@mui/icons-material/Group';
import { CssBaseline } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import React from 'react';

const routing = [
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
export default function SideBar({ setContent }) {
  const handleClick = (value) => {
    setContent(value.id);
  };
  return (
    <>
      <CssBaseline />
      <List>
        {routing.map((value, index) => (
          <ListItem button onClick={(e) => handleClick(value, e)} key={value.id}>
            <ListItemIcon>
              {value.id === 1 ? (
                <AddToDriveIcon />
              ) : value.id === 2 ? (
                <GroupIcon />
              ) : (
                <AutoDeleteIcon />
              )}
            </ListItemIcon>
            <ListItemText>{value.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}
