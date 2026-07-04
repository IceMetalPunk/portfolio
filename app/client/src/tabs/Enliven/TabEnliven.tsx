import './TabEnliven.css';
import MenuScreenshot from '../../assets/porject_samples/enliven_menu.png';
import GameScreenshot from '../../assets/porject_samples/enliven_ingame.png';
import { LightboxImage } from '../../util/LightboxImage';

export const TabEnliven = () => {
  return (
    <>
      <p>
        Made in 2011 with GameMaker 8, for a game jam with the theme "Live".
      </p>
      <p>
        I interpreted that as both live wires <em>and</em> bringing things to
        life, choosing a Frankenstein/Gothic Monster theme for a puzzle game.
        Came in 5th place out of 56 entries.
      </p>
      <section className='image-gallery'>
        <LightboxImage title='Main Menu' src={MenuScreenshot} />
        <LightboxImage title='Level 6' src={GameScreenshot} />
      </section>
    </>
  );
};
