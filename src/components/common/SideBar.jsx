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

export const SideBar = ({ contentID, setContent }) => {
  return (
    <div className='sidebar'>
      <div className='sidebar_tool'>
        <button>
          <i className='bx bx-plus'></i>
          Thêm mới
        </button>
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
