import { Slide, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';

const styleToast = {
  color: '#333',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  width: '250px',
  height: '50px',
  borderRadius: '6px',
};

function SlideTransition(props) {
  return <Slide {...props} direction='up' />;
}

const ShowToast = ({ showToast }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={showToast.show}
      TransitionComponent={SlideTransition}
    >
      {showToast.error ? (
        <div style={{ ...styleToast, backgroundColor: '#fca5a5', color: '#cf4a4a' }}>
          <ErrorOutlineIcon style={{ color: '#cf4a4a', padding: '0 6px' }} fontSize='large' />
          {showToast.text}
        </div>
      ) : (
        <div style={{ ...styleToast, backgroundColor: '#bbf7d0', color: '#34d399' }}>
          <CheckIcon style={{ color: '#34d399', padding: '0 6px' }} fontSize='large' />
          {showToast.text}
        </div>
      )}
    </Snackbar>
  );
};

export default ShowToast;
