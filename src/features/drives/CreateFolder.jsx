import { useMutation } from '@apollo/client';
import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { uploadFile } from '../../graphql/Mutation';

const btnStyle = {
  fontSize: '1.4rem',
  marginLeft: '2.5rem',
};
const dialogContentStyle = {
  width: '400px',
  height: '115px',
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
        }),
      3000
    );
  };

  return (
    <div>
      <Button style={btnStyle} variant='contained' onClick={handleClickOpen}>
        Create Folder
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title'>
        <DialogTitle id='alert-dialog-title'>{'Tạo Thư Mục Mới'}</DialogTitle>
        <DialogContent style={dialogContentStyle}>
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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
