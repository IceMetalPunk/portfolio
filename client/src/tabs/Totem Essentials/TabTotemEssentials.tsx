import { LightboxImage } from '../../util/LightboxImage';
import './TabTotemEssentials.css';
import Screenshot from '../../assets/porject_samples/totem_essentials_screenshot.png';

export const TabTotemEssentials = () => {
  return (
    <>
      <p>
        Made in 2017 in Java, using the Forge framework for Minecraft modding,
        this mod adds 16 new totems to Minecraft 1.12, with everything being
        configurable (32 items if you count upgrades).
      </p>
      <p>
        There are many more examples of similar screenshots like those below,
        but they're out of the scope of a portfolio. I recommend, if you're
        interested, to check out the GitHub Readme!
      </p>
      <section className='image-gallery'>
        <LightboxImage
          title='In-Game Screenshot'
          src={Screenshot}
          caption='How the mod looks in-game, with all its added items in the JEI panel on the right side of the screen.'
        />
        <LightboxImage
          title='Totem of Reaping'
          src='https://github.com/IceMetalPunk/TotemEssentials/raw/master/images/totem_crafting.png'
          caption='The main item in the mod that allows you to get the Essence loot necessary to craft everything else.'
        />
        <LightboxImage
          title='Upgrade Recipes'
          src='https://github.com/IceMetalPunk/TotemEssentials/raw/master/images/ensouled_upgrading.png'
          caption='All Totem items can be upgraded to a second, more powerful, tier using a recipe similar to this.'
        />
      </section>
    </>
  );
};
