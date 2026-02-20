import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenerVisible, setIsOpenerVisible] = useState<boolean>(true);
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      const openerShower = () => setIsOpenerVisible(!isOpen);
      sidebarRef.current.addEventListener('transitionend', openerShower);
      return () =>
        sidebarRef.current?.removeEventListener('transitionend', openerShower);
    }
  }, [sidebarRef.current, isOpen, setIsOpenerVisible]);

  const setOpen = useCallback(
    (opened: boolean) => {
      setIsOpen(opened);
      if (opened) {
        setIsOpenerVisible(false);
      }
    },
    [setIsOpen, setIsOpenerVisible]
  );

  return (
    <section id='sidebar-container'>
      {isOpenerVisible && (
        <a onClick={() => setOpen(true)} className='opener link'>
          ☰
        </a>
      )}
      <section
        ref={sidebarRef}
        id='sidebar'
        className={classNames({
          open: isOpen,
        })}
      >
        <a onClick={() => setOpen(false)} className='closer link'>
          ☰
        </a>
        <ul>
          <li>Synthia Nova</li>
          <li>Compliance</li>
          <li>Godform</li>
        </ul>
      </section>
    </section>
  );
};
