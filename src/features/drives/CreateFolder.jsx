import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useMutation } from '@apollo/client';
import { uploadFile } from '../../graphql/Mutation';

const btnStyle = {
  fontSize: '1.5rem',
  marginLeft: '2.5rem',
};

export default function CreateFolder({ pathPrefix, setAllData, setAlert }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const [startCheck] = useMutation(uploadFile);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const handleConfirm = async () => {
    if (!name)
      setAlert({
        show: true,
        error: true,
        text: 'Name no empty',
      });
    else
      await startCheck({
        variables: { path: pathPrefix, name, extension: '.folder', size: 0, url: '' },
        onCompleted: (data) => {
          setAllData((prevData) => [...prevData, data.uploadFile]);
          setAlert({
            show: true,
            error: false,
            text: 'Success',
          });
        },
        onError: (error) => {
          console.log(`Create folder error: ${error}`);
          setAlert({
            show: true,
            error: true,
            text: 'Folder already exists',
          });
        },
      });

    setOpen(false);

    return setTimeout(
      () =>
        setAlert({
          show: false,
          error: false,
          text: '',
        }),
      3000
    );
  };

  return (
    <div>
      <Button style={btnStyle} variant='contained' onClick={handleClickOpen}>
        Create Folder
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
