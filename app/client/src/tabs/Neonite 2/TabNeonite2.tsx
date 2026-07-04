import { LightboxImage } from '../../util/LightboxImage';
import './TabNeonite2.css';

export const TabNeonite2 = () => {
  return (
    <>
      <p>
        Made in 2012/2013 with GameMaker 8, as a sequel to Neonite. The account
        servers used for the highscores were written in PHP, but have long since
        gone down as hosts went out of business and files got lost; it's still
        playable in single-player offline mode, though.
      </p>
      <section className='image-gallery'>
        <LightboxImage
          title='Neonite 2 Menu: Signed Out'
          src='https://github.com/IceMetalPunk/Neonite-2/blob/master/Graphics/Screenshot_Menu_LoggedOut.png?raw=true'
          caption='The menu before signing in, showing the custom login form.'
        />
        <LightboxImage
          title='Neonite 2 Menu: Signed In'
          src='https://github.com/IceMetalPunk/Neonite-2/blob/master/Graphics/Screenshot_Menu_LoggedIn.png?raw=true'
          caption='The menu after signing in, when the account servers were still online.'
        />
        <LightboxImage
          title='Neonite 2 In-Game'
          src='https://github.com/IceMetalPunk/Neonite-2/blob/master/Graphics/Screenshot_2.png?raw=true'
        />
      </section>
    </>
  );
};
