import ShowToast from '../common/ShowToast';
import MyDrive from 'features/drives/MyDrive';
import React from 'react';
const Layout = () => {
  const [alert, setAlert] = React.useState({
    show: false,
    error: false,
    text: '',
  });

  return (
    <div>
      <MyDrive setAlert={setAlert} />
      <ShowToast showToast={alert} />
    </div>
  );
};

export default Layout;
