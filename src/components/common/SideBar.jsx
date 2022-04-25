import useClickOutSite from 'hooks/useClickOutSite';
import React from 'react';

const sideBarLink = [
  {
    id: 1,
    displayName: 'Kho của tôi',
    icon: 'bx bx-hdd',
  },
  {
    id: 2,
    displayName: 'Được chia sẻ với tôi',
    icon: 'bx bx-share-alt',
  },
  {
    id: 3,
    displayName: 'Thùng rác',
    icon: 'bx bx-trash-alt',
  },
];

const sidebarToolItem = [
  {
    id: 1,
    displayName: 'Thư mục mới',
    icon: 'bx bx-folder-plus',
    type: 'folder',
  },
  {
    id: 2,
    displayName: 'Tải tệp lên',
    icon: 'bx bx-cloud-upload',
    type: 'file',
  },
];
export const SideBar = ({ contentID, setContent }) => {
  const { active, setActive, nodeRef } = useClickOutSite();

  const hiddenFileInput = React.useRef(null);

  const handleAddItem = (type) => {
    if (type === 'file') {
      hiddenFileInput.current.click();
      console.log('add file');
    } else {
      console.log('add folder');
    }
  };

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setActive(false);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar_tool'>
        <button onClick={() => setActive(true)}>
          <i className='bx bx-plus'></i>
          Thêm mới
        </button>
        <div className={`sidebar_tool_panel ${active && 'active'}`} ref={nodeRef}>
          <input
            type='file'
            style={{ display: 'none' }}
            ref={hiddenFileInput}
            onChange={(e) => changeHandler(e)}
          />
          {sidebarToolItem.map((item) => (
            <div
              className='sidebar_tool_panel_item'
              key={item.id}
              onClick={() => handleAddItem(item.type)}
            >
              <i className={item.icon}></i>
              <span>{item.displayName}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='sidebar_link'>
        {sideBarLink.map((item) => (
          <div
            className={`sidebar_link-item ${contentID === item.id ? 'active' : ''}`}
            key={item.id}
            onClick={() => setContent(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
