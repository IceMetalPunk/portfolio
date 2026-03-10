import { Link } from 'react-router';
import './TabNeonite.css';
import { LightboxImage } from '../../util/LightboxImage';

export const TabNeonite = () => {
  return (
    <>
      <p>
        Made in 2011 with GameMaker 8, for a game jam. Received{' '}
        <Link
          to='https://jayisgames.com/review/weekend-download-129.php'
          target='_blank'
        >
          a brief review
        </Link>{' '}
        on games review website Jay Is Games, along with only two other entries
        from the jam.
      </p>
      <p>
        The inspiration for this game was a classic arcade game feel for the
        brick-matching genre, but with the twist of <em>opposing</em> colors
        rather than matching ones.
      </p>
      <section className='image-gallery'>
        <LightboxImage
          title='Neonite Menu'
          src='https://github.com/IceMetalPunk/Neonite/blob/master/Graphics/Neonite_ScreenShot_Menu.png?raw=true'
        />
        <LightboxImage
          title='Neonite In-Game'
          src='https://github.com/IceMetalPunk/Neonite/blob/master/Graphics/Neonite_ScreenShot_InGame.png?raw=true'
          caption='You shoot blocks from left to right as the wall moves in closer, accelerating over time until it reaches the left edge and you lose with a local high score. Power-ups help you clear more blocks out at a time.'
        />
      </section>
    </>
  );
};
