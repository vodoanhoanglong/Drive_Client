import { Slide, Snackbar } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from 'react';

const styleToast = {
  color: '#333',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  display: 'flex',
  backgroundColor: '#b5e6b5',
  alignItems: 'center',
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
      message={
        <div style={styleToast}>
          {showToast.error ? (
            <ErrorOutlineIcon style={{ color: 'red', paddingRight: 2 }} fontSize='medium' />
          ) : (
            <CheckIcon style={{ color: 'green', paddingRight: 2 }} fontSize='medium' />
          )}
          {showToast.text}
        </div>
      }
    />
  );
};

export default ShowToast;
