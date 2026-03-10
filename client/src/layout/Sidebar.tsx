import { useCallback, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { TAB_ROUTES } from '../util/constants';
import { Link } from 'react-router';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  return (
    <section id='sidebar-container'>
      {!isOpen && (
        <a onClick={open} className='opener link'>
          ☰
        </a>
      )}
      <Offcanvas show={isOpen} onHide={close} placement='start' backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Projects</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul id='sidebar-list'>
            {Object.entries(TAB_ROUTES).map(([route, data]) => {
              if (route === '/') {
                return null;
              }
              return (
                <li key={route}>
                  <Link to={`/${route}`} onClick={close} className='link'>
                    {data.projectIcon} {data.projectName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  );
};
