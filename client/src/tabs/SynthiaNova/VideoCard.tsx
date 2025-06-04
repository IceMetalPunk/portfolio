import './VideoCard.css';
import { decode } from 'html-entities';
import { useMemo, useState } from 'react';
import type { LyricsPanelProps } from './LyricsPanel';
type VideoCardProps = {
  id: string;
  title: string;
  thumbnail_url: string;
  setLyricsData: React.Dispatch<React.SetStateAction<LyricsPanelProps>>;
  description: string;
};
export const VideoCard = ({
  id,
  title,
  thumbnail_url,
  setLyricsData,
  description,
}: VideoCardProps) => {
  const [showEmbedded, setShowEmbedded] = useState<boolean>(false);
  const cleanTitle = useMemo(() => {
    const cleaned: string = decode(title, { level: 'all' }).split(
      ' - Synthia Nova'
    )[0];
    const matchQuotedTitle: RegExpMatchArray | null = cleaned.match(/".*?"/i);
    return matchQuotedTitle ? matchQuotedTitle[0] : cleaned;
  }, [title]);

  return (
    <div className='video-card'>
      {showEmbedded && (
        <iframe
          src={`https://www.youtube.com/embed/${encodeURIComponent(
            id
          )}?autoplay=1`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen={true}
          className='video-embed'
        ></iframe>
      )}
      {!showEmbedded && (
        <img
          src={thumbnail_url}
          className='video-thumbnail'
          onClick={() => setShowEmbedded(true)}
        />
      )}
      <a
        target='_blank'
        href={`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`}
      >
        <strong>{cleanTitle}</strong>
      </a>
      <br />
      <a
        className='lyric-link'
        onClick={() =>
          setLyricsData({
            fullTitle: cleanTitle,
            description,
            open: true,
          })
        }
      >
        Lyrics
      </a>
    </div>
  );
};
