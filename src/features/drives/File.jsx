import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Divider, List, ListItem, ListItemText, Popover } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { getStorage, ref, deleteObject } from 'firebase/storage';
import { app } from '../../firebase/base';

import { deleteFile } from '../../graphql/Mutation';
import { useMutation } from '@apollo/client';

const Item = styled(Button)(({ theme }) => ({
  backgroundColor: '#1A2027',
  padding: theme.spacing(2),
  fontStyle: 'bold',
  fontSize: '1.5rem',
  color: '#ffff',
  width: '100%',
  ':hover': { backgroundColor: '#1A2592' },
}));

const styleContent = {
  backgroundColor: '#1A2027',
  color: '#ffff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const styleCardIcon = {
  color: '#ffff',
  fontSize: 20,
};

const styleDivider = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

const styleListItemText = {
  fontSize: '1.5rem',
  fonWeight: 'bold',
};

const styleImage = { objectFit: 'contain' };

const img = ['.png', '.jpeg', '.jpg', '.gif', '.bmp'];
const audio = ['.mp3', '.wav', '.ogg', '.flac'];
const video = ['.mp4', '.avi', '.mkv', '.mov', '.wmv'];

const handleFileType = (
  { extension, url, name, id },
  anchorEl,
  setAnchorEl,
  pathPrefix,
  deleteExcute,
  setAllData
) => {
  if (!img.includes(extension) && !audio.includes(extension) && !video.includes(extension)) {
    return (
      <Item startIcon={<InsertDriveFileIcon />} onClick={() => window.open(url)}>
        {name}
        {extension}
      </Item>
    );
  }
  const open = Boolean(anchorEl);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          style={styleImage}
          component={handleExtension(extension)}
          height='140'
          src={url}
          alt='green iguana'
          onClick={() => window.open(url)}
        />
        <CardContent style={styleContent}>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
            {extension}
          </Typography>
          <MoreVertIcon
            style={styleCardIcon}
            onClick={(event) => handleClickIconSetting(event, setAnchorEl)}
          />
        </CardContent>
      </CardActionArea>
      <Popover
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List sx={styleDivider} component='nav'>
          <ListItem
            button
            onClick={() => handleDelete(setAnchorEl, pathPrefix, id, deleteExcute, setAllData)}
          >
            <ListItemText style={styleListItemText} primary='Delete' />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText style={styleListItemText} primary='Share' />
          </ListItem>
        </List>
      </Popover>
    </Card>
  );
};

const handleExtension = (extension) => {
  if (img.includes(extension)) {
    return 'img';
  } else if (audio.includes(extension)) {
    return 'audio';
  } else if (video.includes(extension)) {
    return 'video';
  }
};

const handleClickIconSetting = (event, setAnchorEl) => {
  setAnchorEl(event.currentTarget);
};

const handleDelete = async (setAnchorEl, pathPrefix, fileId, deleteExcute, setAllData) => {
  setAnchorEl(null);
  const storage = getStorage(app);

  // Create a reference to the file to delete
  const desertRef = ref(storage, pathPrefix);

  // Delete the file
  await deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      console.log(`Delete file error: ${error}`);
    });

  await deleteExcute({
    variables: { id: fileId },
    onCompleted: () => setAllData((prevData) => [...prevData].filter((item) => item.id !== fileId)),
  });
};

export default function File(props) {
  const { data, pathPrefix, setAllData } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deleteExcute] = useMutation(deleteFile);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((value, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {handleFileType(
              value,
              anchorEl,
              setAnchorEl,
              `${pathPrefix}/${value.name}${value.extension}`,
              deleteExcute,
              setAllData
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
