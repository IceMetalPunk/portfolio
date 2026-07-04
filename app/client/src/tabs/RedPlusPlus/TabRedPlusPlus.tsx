import { LightboxImage } from '../../util/LightboxImage';
import './TabRedPlusPlus.css';

export const TabRedPlusPlus = () => {
  return (
    <>
      <p>
        Made in 2017 in Java, using the Forge framework for Minecraft modding,
        as a spiritual successor to RedPlus.
      </p>
      <p>
        This is a much smaller mod than the original RedPlus, but for a slightly
        newer version of Minecraft. It only added a few tweaks and utilities,
        and as such I never took any screenshots when Minecraft 1.12 was
        current. But you can view the list of additional features below.
      </p>
      <section className='image-gallery'>
        <LightboxImage
          title='RedPlusPlus Feature List'
          src='https://github.com/IceMetalPunk/RedPlusPlus/blob/master/FeatureList.png?raw=true'
        />
      </section>
    </>
  );
};
