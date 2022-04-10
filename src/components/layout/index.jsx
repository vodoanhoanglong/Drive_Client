import { Header, SideBar } from 'components/common';
import MyDrive from 'features/storage/pages/MyDrive';
import SharedWithMe from 'features/storage/pages/SharedWithMe';
import Trash from 'features/storage/pages/Trash';
import React from 'react';

const Layout = () => {
  const [contentID, setContentID] = React.useState(1);
  return (
    <div className='layout'>
      <Header />
      <SideBar contentID={contentID} setContent={setContentID} />
      <div className='main-content'>
        {contentID === 1 && <MyDrive />}
        {contentID === 2 && <SharedWithMe />}
        {contentID === 3 && <Trash />}
      </div>
    </div>
  );
};

export default Layout;
