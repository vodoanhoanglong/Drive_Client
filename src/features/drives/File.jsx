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

import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../app/firebaseConfig';

import { deleteFile } from '../../graphql/Mutation';
import { useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';

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

const handleExtension = (extension) => {
  if (img.includes(extension)) {
    return 'img';
  } else if (audio.includes(extension)) {
    return 'audio';
  } else if (video.includes(extension)) {
    return 'video';
  }
};

export default function File(props) {
  const { data, pathPrefix, setAllData } = props;
  const [deleteExcute] = useMutation(deleteFile);

  const handleDelete = async (id, pathPrefix) => {
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
      variables: { id },
      onCompleted: () => setAllData((prevData) => [...prevData].filter((item) => item.id !== id)),
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((value, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {!img.includes(value.extension) &&
            !audio.includes(value.extension) &&
            !video.includes(value.extension) ? (
              <Item startIcon={<InsertDriveFileIcon />} onClick={() => window.open(value.url)}>
                {value.name}
                {value.extension}
              </Item>
            ) : (
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    style={styleImage}
                    component={handleExtension(value.extension)}
                    height='140'
                    src={value.url}
                    alt='green iguana'
                    onClick={() => window.open(value.url)}
                  />
                  <CardContent style={styleContent}>
                    <Typography gutterBottom variant='h5' component='div'>
                      {value.name}
                      {value.extension}
                    </Typography>
                    <DeleteIcon
                      style={styleCardIcon}
                      onClick={() =>
                        handleDelete(value.id, `${pathPrefix}/${value.name}${value.extension}`)
                      }
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
