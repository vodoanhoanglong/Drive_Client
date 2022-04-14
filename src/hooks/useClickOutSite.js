import React from 'react';

export default function useClickOutSite(element = 'button') {
  const [active, setActive] = React.useState(false);
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (nodeRef && !nodeRef.current.contains(event.target) && !event.target.matches(element)) {
        //* click in site dropdown
        setActive(false);
      }
      //* click outside dropdown
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [element]);

  return {
    active,
    setActive,
    nodeRef,
  };
}
