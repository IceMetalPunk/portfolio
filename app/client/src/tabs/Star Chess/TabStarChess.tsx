import { LightboxImage } from '../../util/LightboxImage';
import './TabStarChess.css';
import MenuScreenshot from '../../assets/porject_samples/starchess_menu.png';
import GameScreenshot from '../../assets/porject_samples/starchess_ingame.png';

export const TabStarChess = () => {
  return (
    <>
      <p>
        Made in 2013 with GameMaker 8, Star Chess is a virtual "capture their
        pieces" board game played on a chess board, but with pieces unlike any
        standard chess pieces, and holes randomly spawned in the board each
        game. It evokes the strategy of chess for a new generation.
      </p>
      <p>
        Though the planned multiplayer sequel never happened, the original
        one-player vs AI version is complete.
      </p>
      <section className='image-gallery'>
        <LightboxImage title='Star Chess Menu' src={MenuScreenshot} />
        <LightboxImage title='Star Chess Game Board' src={GameScreenshot} />
      </section>
    </>
  );
};
