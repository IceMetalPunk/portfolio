import { useState, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';

interface LightboxImageProps {
  src: string;
  title?: string;
  caption?: string;
}
export const LightboxImage = ({ src, title, caption }: LightboxImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleOpen = useCallback(() => setIsOpen(true), []);

  return (
    <>
      <img src={src} className='lightbox-image' onClick={handleOpen} />
      <Modal show={isOpen} onHide={handleClose} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={src} className='img-fluid' />
        </Modal.Body>
        {caption && <Modal.Footer>{caption}</Modal.Footer>}
      </Modal>
    </>
  );
};
