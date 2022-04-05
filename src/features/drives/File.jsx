import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

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

import imgDocx from '../../assets/icon/file-icon/docx.svg';
import imgPdf from '../../assets/icon/file-icon/pdf.svg';
import imgPpt from '../../assets/icon/file-icon/ppt.svg';
import imgTxt from '../../assets/icon/file-icon/txt.svg';
import imgXlsx from '../../assets/icon/file-icon/xlsx.svg';
import imgEmpty from '../../assets/icon/file-icon/empty-folder.png';
import ShareFile from './ShareFile';

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

const styleImage = { objectFit: 'contain' };
const styleEmpty = {
  display: 'inline-block',
  textAlign: 'center',
  margin: '0 auto',
};
const styleEmptyImg = {
  height: '120px',
  width: '120px',
};
const styleContainIcon = {
  width: '25%',
  display: 'flex',
  justifyContent: 'space-between',
};

const img = ['.png', '.jpeg', '.jpg', '.gif', '.bmp'];
const audio = ['.mp3', '.wav', '.ogg', '.flac'];
const video = ['.mp4', '.avi', '.mkv', '.mov', '.wmv'];
const documents = ['.docx', '.pdf', '.ppt', '.txt', '.xlsx'];

const handleExtension = (extension) => {
  if (img.includes(extension)) {
    return 'img';
  } else if (audio.includes(extension)) {
    return 'audio';
  } else if (video.includes(extension)) {
    return 'video';
  }

  return 'iframe';
};

const handleImage = (extension, url) => {
  switch (extension) {
    case '.docx':
      return imgDocx;
    case '.pdf':
      return imgPdf;
    case '.ppt':
      return imgPpt;
    case '.txt':
      return imgTxt;
    case '.xlsx':
      return imgXlsx;
    default:
      return url;
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
        {data.length !== 0 ? (
          data.map((value, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              {!img.includes(value.extension) &&
              !audio.includes(value.extension) &&
              !video.includes(value.extension) &&
              !documents.includes(value.extension) ? (
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
                      src={handleImage(value.extension, value.url)}
                      alt='green iguana'
                      onClick={() => window.open(value.url)}
                    />
                    <CardContent style={styleContent}>
                      <Typography gutterBottom variant='h5' component='div'>
                        {value.name}
                        {value.extension}
                      </Typography>
                      <div style={styleContainIcon}>
                        <DeleteIcon
                          style={styleCardIcon}
                          onClick={() =>
                            handleDelete(value.id, `${pathPrefix}/${value.name}${value.extension}`)
                          }
                        />
                        <ShareFile fileId={value.id} />
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              )}
            </Grid>
          ))
        ) : (
          <div style={styleEmpty}>
            <img src={imgEmpty} style={styleEmptyImg} alt='' />
            <h1>
              <b>No any file</b>
            </h1>
          </div>
        )}
      </Grid>
    </Box>
  );
}
