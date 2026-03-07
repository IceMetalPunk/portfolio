import './LyricsPanel.css';
// import classNames from 'classnames';
import { decode } from 'html-entities';
import { useMemo } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { IoMdMusicalNote } from 'react-icons/io';

export interface LyricsPanelProps {
  fullTitle: string;
  description: string;
  open: boolean;
  togglePanelCallback?: () => void;
}
export const LyricsPanel = ({
  fullTitle,
  description,
  open = false,
  togglePanelCallback,
}: LyricsPanelProps) => {
  const descriptionSections: Array<string> = useMemo(
    () => description.split(/-{4,}/),
    [description]
  );
  const title: string = useMemo(
    () =>
      decode(
        descriptionSections.length > 2 ? descriptionSections.at(-2)! : fullTitle
      ),
    [descriptionSections]
  );
  const lyrics: string = useMemo(
    () =>
      decode(
        descriptionSections.length > 2
          ? descriptionSections.at(-1)!
          : 'No Lyrics Available. See Video.'
      ),
    [descriptionSections]
  );

  return (
    <Offcanvas
      show={open}
      onHide={togglePanelCallback}
      placement='end'
      backdrop={false}
      scroll={true}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <strong>
            <IoMdMusicalNote /> {title}
          </strong>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body></Offcanvas.Body>
      <section className='lyric-body'>{lyrics.trim()}</section>
    </Offcanvas>
    // <div
    //   className={classNames({
    //     'lyric-panel': true,
    //     open,
    //   })}
    // >
    //   <a className='close-button' onClick={() => togglePanelCallback?.()}>
    //     ❌
    //   </a>
    //   <strong>{title}</strong>
    //   <div className='lyrics'>{lyrics.trim()}</div>
    // </div>
  );
};
