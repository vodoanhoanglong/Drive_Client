import React from 'react';
const Modal = ({ isActive, children }) => {
  return <div className={`modal ${isActive && 'active'}`}>{children}</div>;
};

export default Modal;
