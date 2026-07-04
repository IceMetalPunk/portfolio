import { LightboxImage } from '../../util/LightboxImage';
import './TabSophiasSpirits.css';
import MenuScreenshot from '../../assets/porject_samples/sophias_spirits_menu.png';
import StoryScreenshot from '../../assets/porject_samples/sophias_spirits_story.png';
import GameScreenshot from '../../assets/porject_samples/sophias_spirits_ingame.png';

export const TabSophiasSpirits = () => {
  return (
    <>
      <p>
        Made in 2011 with GameMaker 8 for a game jam with the theme "Laws", this
        collaboration with an artist with the username The Ultimate won us 2nd
        place out of 36 entries.
      </p>
      <p>
        I interpreted the theme as "Laws of Nature", and represented that by
        focusing the game mechanics on warping space by swapping screen
        quadrants, while fighting enemies and collecting secrets.
      </p>
      <section className='image-gallery'>
        <LightboxImage title='Main Menu' src={MenuScreenshot} />
        <LightboxImage
          title='Story Character Art'
          src={StoryScreenshot}
          caption='Part of the introductory cutscene, showing character concept art of Sophia herself.'
        />
        <LightboxImage
          title='In-Game'
          src={GameScreenshot}
          caption="In-game screenshots have been lost to time, but this one I've taken from a player's YouTube video of his demo playthrough. As the video and game are old, the quality of the image isn't as good as in-game."
        />
      </section>
    </>
  );
};
