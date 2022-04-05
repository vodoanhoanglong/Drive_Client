import React from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SHARE_FILE } from '../../graphql/Mutation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'space-between',
};
const btnStyle = {
  fontSize: '1.5rem',
};
const styleTextField = {
  width: 220,
};

export default function ShareFile({ fileId }) {
  const [shareToUser] = useMutation(SHARE_FILE);

  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleShare = async () => {
    await shareToUser({
      variables: {
        fileId,
        shareToUserId: input,
      },
    });
    handleClose();
  };

  return (
    <div>
      <ReplyIcon onClick={handleOpen} />
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={style}>
          <TextField
            id='outlined-basic'
            label='Nhập id người dùng'
            variant='outlined'
            style={styleTextField}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant='contained' component='span' style={btnStyle} onClick={handleShare}>
            Share
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
