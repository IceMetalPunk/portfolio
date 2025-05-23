import { decode } from 'html-entities';
import { useMemo } from 'react';
type VideoCardProps = {
  id: string;
  title: string;
  thumbnail_url: string;
  description?: string;
};
export const VideoCard = ({ id, title, thumbnail_url }: VideoCardProps) => {
  const cleanTitle = useMemo(() => {
    const cleaned: string = decode(title, { level: 'all' }).split(
      ' - Synthia Nova'
    )[0];
    const matchQuotedTitle: RegExpMatchArray | null = cleaned.match(/".*?"/i);
    return matchQuotedTitle ? matchQuotedTitle[0] : cleaned;
  }, [title]);
  return (
    <div className='video-card'>
      <a
        target='_blank'
        href={`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`}
      >
        <img src={thumbnail_url} className='video-thumbnail' />
        <strong>{cleanTitle}</strong>
      </a>
    </div>
  );
};
