import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: '#1A2027',
  padding: theme.spacing(2),
  fontStyle: 'bold',
  fontSize: '1.5rem',
  color: '#ffff',
  width: '100%',
  ':hover': { backgroundColor: '#1A2592' },
}));

export default function Folder(props) {
  const {
    data,
    param: { setPathName, setPathPrefix },
  } = props;

  const handleClick = (id, name) => () => {
    setPathName((prev) => `${prev} / ${name}`);
    setPathPrefix((prev) => `${prev}/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((value) => (
          <Grid item xs={2} sm={4} md={4} key={value.id}>
            <Item startIcon={<FolderIcon />} onClick={handleClick(value.id, value.name)}>
              {value.name}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
